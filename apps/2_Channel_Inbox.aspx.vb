Imports System.Data
Imports System.Data.SqlClient
Public Class _2_Channel_Inbox
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        funcListInbox()

    End Sub

    Function funcListInbox()
        Dim strListInbox As String
        'select conversation_id,code=(select code from conversations where conversations.id=conversation_id),sender_id,CustomerName=(select name from customers where sender_id=customers.number) from chats where sender_type='customer' group by sender_id,conversation_id
        Dim cs As String = ConfigurationManager.ConnectionStrings("WAConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim jumlahData As Integer = 0
        Dim dataInboxChannel As String = String.Empty
        Dim badgesStatus As String = String.Empty
        Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
        Dim ThreadID As String = strTime & New Random().Next(1000000, 9999999)
        Dim NumberID As String = strTime & New Random().Next(100000000, 999999999)

        Try
            strQuery = "select * from WA_vw_listEndChat where EndChat = 1 order by conversation_id desc"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    jumlahData = jumlahData + 1

                    If Request.QueryString("channel").ToString = "wa" Then
                        If rdr("EndChat").ToString = "False" Then
                            badgesStatus = "<span class='badge badge-dot badge-success'></span>"
                        Else
                            badgesStatus = "<span class='badge badge-dot badge-danger'></span>"
                        End If
                        dataInboxChannel &= "<div class='media align-items-center'>" &
                              "<div class='custom-control custom-checkbox'>" &
                                "<input type='checkbox' class='custom-control-input'>" &
                              "</div>" &
                              "<div class='app-contact-star'><a href='#'><i class='fa fa-star text-yellow'></i></a></div>" &
                              badgesStatus &
                              "<a class='flexbox flex-grow gap-items text-truncate' href='#qv-user-details' data-toggle='quickview'>" &
                                "<img class='avatar' src='../images/avatar/1.jpg' alt='...'>" &
                                "<div class='media-body text-truncate'>" &
                                  "<h6>" & rdr("CustomerName").ToString & "</h6>" &
                                  "<small>" &
                                    "<span>Chat ID : " & rdr("Code").ToString & "</span>" &
                                    "<span class='divider-dash'>" & rdr("sender_id").ToString & "</span>" &
                                  "</small>" &
                                "</div>" &
                              "</a>" &
                              "<div class='dropdown'>" &
                                "<a class='text-fade' href='#' data-toggle='dropdown'><i class='ti-more-alt rotate-90'></i></a>" &
                                "<div class='dropdown-menu dropdown-menu-right'>" &
                                  "<a class='dropdown-item' href='#' onclick='ActionSendDataToThread(" & rdr("conversation_id").ToString & ",&apos;" & ThreadID & "&apos;,&apos;" & NumberID & "&apos;)'><i class='fa fa-fw fa-pencil'></i> Create Ticket</a>" &
                                  "<a class='dropdown-item' href='3_Channel_WA.aspx'><i class='fa fa-fw fa-commenting'></i> Direct To WA</a>" &
                                  "<a class='dropdown-item' href='#'><i class='fa fa-fw fa-phone'></i> Call</a>" &
                                   "<a class='dropdown-item' href='#'><i class='fa fa-fw fa-envelope'></i> Email</a>" &
                                  "<div class='dropdown-divider'></div>" &
                                  "<a class='dropdown-item' href='#'><i class='fa fa-fw fa-trash'></i> Delete</a>" &
                                "</div>" &
                              "</div>" &
                           "</div>"
                    Else
                        dataInboxChannel = "No data to display..."
                    End If

                End While
                listDetailInbox.Text = dataInboxChannel
            End Using
        Catch ex As Exception

        Finally
            strListInbox = "<ul Class='list-style-none font-size-16'> " &
                            "<li Class='box-label'><a href='javascript:void(0)'>All Channel <span>" & jumlahData & "</span></a></li> " &
                            "<li Class='divider'></li> " &
                            "<li> <a Class='text-success' href='?channel=wa'><i class='fa fa-fw fa-whatsapp'></i> <span class='text-success'>" & jumlahData & "</span></a></li> " &
                            "<li> <a Class='text-warning' href='?channel=mail'><i class='fa fa-envelope-o' aria-hidden='true'></i> <span class='text-warning'>0</span></a></li> " &
                            "<li> <a Class='text-info' href='?channel=fb'><i class='fa fa-fw fa-facebook-official'></i> <span class='text-info'>0</span></a></li> " &
                            "<li> <a Class='text-primary' href='?channel=tw'><i class='fa fa-fw fa-twitter'></i> <span class='text-primary'>0</span></a></li> " &
                        "</ul>"
        End Try
        listInbox.Text = strListInbox
    End Function

End Class