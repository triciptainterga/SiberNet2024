Imports System
Imports System.Web.UI
Imports System.Data.SqlClient
Imports Microsoft.VisualBasic
Public Class auth_local
    Inherits System.Web.UI.Page

    Public AddCookiess As String = ConfigurationManager.AppSettings.Item("AddCookiess")

    Dim Proses As New ClsConn
    Dim sqldr, readLDAP, _reading, readerlic As SqlDataReader
    Dim sql As String
    Dim valuesatu As Integer = 1
    Dim valuedua As Integer = 2
    Dim valuetiga As Integer = 3
    Dim ValueEmpat As Integer = 4
    Dim valueLima As Integer = 5
    Dim valueTest As Integer = 10

    Dim valueDispatchLayer2 As Integer = 2
    Dim valueDispatchLayer3 As Integer = 3
    Dim valueReassignLayer1 As Integer = 1

    Dim leveluser As String
    Dim value As String
    Dim CountLDAP As String = String.Empty
    Dim Con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlconaux As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim com, sqlcom, sqlcomaux As SqlCommand

    Dim connString As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    Dim recLDAP As Integer
    Dim recCount As Integer
    Dim _ClassFunction As New WebServiceTransaction
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim _ClassAux As New TrmAux
    Dim VariabelCookiesUsername As New HttpCookie("CookiesUserName")
    Dim strCounting As String = String.Empty
    Dim checkErr, checkSisa, checkLogin, stringErr As String
    Dim RedirectUrl As String = String.Empty
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub
    Private Sub Login_ButtonSubmit_ServerClick(sender As Object, e As EventArgs) Handles Login_ButtonSubmit.ServerClick
        Try
            Using conn As New SqlConnection(connString)
                conn.Open()
                strCounting = "Select COUNT (UserID) as userID from msUser where UserName=@uservalue"
                Dim cmd As SqlCommand = New SqlCommand(strCounting, conn)
                Dim uservalue As SqlParameter = New SqlParameter("@uservalue", SqlDbType.VarChar, 150)
                uservalue.Value = Login_Username.Value
                cmd.Parameters.Add(uservalue)
                recLDAP = cmd.ExecuteScalar()
                If recLDAP = 1 Then
                    _ClassFunction.LogSuccess(strLogTime, strCounting)
                    AccessLogin(Login_Username.Value, Login_Password.Value)
                Else
                    _ClassFunction.LogSuccess(Session("UserName"), strCounting)
                End If
            End Using
        Catch ex As Exception
            _ClassFunction.LogError(Session("UserName"), ex, strCounting)
            Response.Write(ex.Message)
        End Try
    End Sub
    Function AccessLogin(ByVal UserName As String, ByVal Password As String)
        Dim Login_True As String = ""
        sql = "exec SP_LOGIN_APPLIKASI  '" & UserName & "','" & Password & "'"
        'sql = "EXEC SP_LOGIN_APPLIKASI  '" & username & "','" & _ClassFunction.Encrypt(password) & "'"
        Try
            sqldr = Proses.ExecuteReader(sql)
            If sqldr.HasRows Then
                sqldr.Read()
                leveluser = sqldr("LAYER").ToString
                Session("UserName") = sqldr("UserName").ToString
                Session("lblUserName") = sqldr("UserName").ToString
                Session("UnitKerja") = sqldr("UNITKERJA").ToString
                Session("Org") = sqldr("ORGANIZATION_NAME").ToString
                Session("NameKaryawan") = sqldr("NAME").ToString
                Session("LoginType") = sqldr("LAYER").ToString
                Session("lvluser") = sqldr("LevelUser").ToString
                Session("channel_code") = sqldr("CHANNEL_CODE").ToString
                Session("organization") = sqldr("ORGANIZATION").ToString
                Session("orgSupervisor") = sqldr("ORGANIZATION").ToString
                Session("lokasiPengaduan") = ""
                Session("sessionchat") = sqldr("CHAT").ToString
                Session("unitkerjaagent") = sqldr("IdGrup").ToString
                Session("ROLE") = sqldr("LEVELUSER").ToString
                Session("LEVELUSERID") = sqldr("ROLE_ID").ToString
                Session("LoginTypeAngka") = sqldr("NumberNya").ToString
                Session("_LoginState") = sqldr("LoginState").ToString
                Session("NamaGrup") = sqldr("NamaGrup").ToString
                Session("EscalationIdentity") = sqldr("EscalationIdentity").ToString
                Session("EscalationTo") = sqldr("EscalationTo").ToString
                Session("LevelUserID") = sqldr("LevelUserID").ToString
                Session("EmailAddress") = sqldr("EMAIL_ADDRESS").ToString
                Session("Foto") = sqldr("URL").ToString
                Session("Ext") = sqldr("PBXUSER").ToString
                Session("MultiChatToken") = sqldr("TokenMeta").ToString
                Session("UrlDatakelola") = sqldr("UrlDatakelola").ToString
                Session("CompanyToken") = sqldr("CompanyToken").ToString

                VariabelCookiesUsername.Values("CookiesUserName") = sqldr("UserName").ToString
                VariabelCookiesUsername.Expires = DateTime.Now.AddDays(AddCookiess)
                Response.Cookies.Add(VariabelCookiesUsername)
                Login_True = "YesExist"
            End If
            sqldr.Close()
            _ClassFunction.LogSuccess(Session("UserName"), sql)

            'CheckLicense()
            FatchingTable()

        Catch ex As Exception
            _ClassFunction.LogError(Session("UserName"), ex, sql)
            Response.Write(ex.Message)
        End Try

        If Request.QueryString("") <> "" Then
            _ClassAux.InsertLoginActivity("9", Session("UserName"), "Update")
        Else
        End If

        If Login_True = "YesExist" Then
            If Session("lvluser") = "Layer 1" Then
                Response.Redirect("apps/2_taskboard.aspx?status=Open&api=1")
                'Response.Redirect("apps/Tele_TrxTaskboard.aspx?")
            Else
                Response.Redirect("apps/2_taskboard.aspx?status=Open")
            End If
        Else
            Login_NotifErr.Visible = True
            ErrorLabel.Visible = True
            ErrorLabel.Text = "Your username or password is incorrect, Try again"
        End If
    End Function
    Private Sub CheckLicense()
        sql = "EXEC [SP_INV_CHECK_LIC_SUM]  '" & Login_Username.Value & "','UideskIndonesia','BRILife','2021-12-17','2030-12-17'"
        Try
            readerlic = Proses.ExecuteReader(sql)
            If readerlic.HasRows Then
                While readerlic.Read()
                    checkErr = readerlic("JumlahLic").ToString
                    checkSisa = readerlic("SisaNya").ToString
                    checkLogin = readerlic("StatusLogin").ToString
                    RedirectUrl = readerlic("RedirectUrl").ToString
                    If checkErr = "err" Then
                        stringErr &= readerlic("StatusNya").ToString & " Ilegal License, Move Error License ! <br>"
                    Else
                        If checkSisa <= 0 Then
                            If String.IsNullOrEmpty(checkLogin) Then
                                If checkLogin = "OK" Then

                                Else
                                    stringErr &= readerlic("StatusNya").ToString & " License Habis !  <br>"
                                End If
                            Else
                                stringErr &= readerlic("StatusNya").ToString & " License Habis ! " & Login_Username.Value & " masih dalam kedaan login <br>"
                                If RedirectUrl = "False" Then
                                    stringErr = "License Habis !  <br>"
                                Else
                                    FatchingTable()
                                    Response.Redirect("apps/2_taskboard.aspx?")
                                End If
                                'If Request.QueryString("phone") <> "" Then
                                '    Response.Redirect("HTML/tr_utama_new.aspx?new=1&ivcid=x&phone=" & Request.QueryString("phone") & "")
                                'Else
                                '    Response.Redirect("HTML/new_inbox.aspx")
                                'End If
                            End If
                        Else
                            stringErr &= readerlic("StatusNya").ToString & " License Tersedia ! <br>"
                            If RedirectUrl = "False" Then
                                stringErr = "License Habis !  <br>"
                            Else
                                FatchingTable()
                                Response.Redirect("apps/2_taskboard.aspx?")
                            End If
                            'If Request.QueryString("phone") <> "" Then
                            '    Response.Redirect("HTML/tr_utama_new.aspx?new=1&ivcid=x&phone=" & Request.QueryString("phone") & "")
                            'Else
                            '    Response.Redirect("HTML/new_inbox.aspx")
                            'End If
                            'query()
                        End If

                    End If
                End While
            End If
            readerlic.Close()
        Catch ex As Exception
            Response.Write(ex.Message)
        Finally
            Login_NotifErr.Visible = True
            ErrorLabel.Visible = True
            ErrorLabel.Text = stringErr
        End Try
    End Sub
    Private Sub FatchingTable()
        Dim UpdateLogin As String = String.Empty
        Try
            UpdateLogin = "UPDATE MSUSER SET LOGIN='1', IdAUX='9', DescAUX='READY', AUTHORITY='" & RandomString(Request.QueryString("user")) & "' WHERE USERNAME ='" & Session("username") & "'"
            Proses.ExecuteNonQuery(UpdateLogin)
            _ClassFunction.LogSuccess(strLogTime, UpdateLogin)
        Catch ex As Exception
            _ClassFunction.LogError(strLogTime, ex, UpdateLogin)
            Response.Write(ex.Message)
        End Try
        Dim strSosmed As String = "SELECT * FROM UIDESK_SOCIAL_ACCOUNT WHERE AccountID='" & Request.QueryString("id") & "'"
        Try
            sqldr = Proses.ExecuteReader(strSosmed)
            If sqldr.HasRows Then
                sqldr.Read()
                Session("token") = sqldr("AccountToken").ToString
                Session("accountid") = sqldr("AccountID").ToString
                Session("accountname") = sqldr("AccountName").ToString
                Session("accounturl") = sqldr("AccountURL").ToString
                Session("webhookurl") = sqldr("Webhook").ToString
            Else
            End If
            sqldr.Close()
            _ClassFunction.LogSuccess(Session("UserName"), strSosmed)
        Catch ex As Exception
            _ClassFunction.LogError(Session("UserName"), ex, strSosmed)
            Response.Write(ex.Message)
        End Try

        Dim strAux As String = "SELECT TOP 1 * FROM UIDESK_TrxAux WHERE AuxUserName='" & Session("username") & "' ORDER BY ID DESC"
        Try
            sqldr = Proses.ExecuteReader(strAux)
            If sqldr.HasRows Then
                sqldr.Read()
                If sqldr("AuxID").ToString <> "9" Then
                    _ClassAux.InsertAgentAux("9", Session("UserName"))
                    _ClassAux.InsertLoginActivity("9", Session("UserName"), "Insert")
                Else
                    _ClassAux.InsertLoginActivity("9", Session("UserName"), "Insert")
                End If
            Else
                _ClassAux.InsertLoginActivity("9", Session("UserName"), "Insert")
            End If
            sqldr.Close()
            _ClassFunction.LogSuccess(Session("UserName"), strAux)
        Catch ex As Exception
            _ClassFunction.LogError(Session("UserName"), ex, strAux)
            Response.Write(ex.Message)
        End Try

        If Request.QueryString("") <> "" Then
            _ClassAux.InsertLoginActivity("9", Session("UserName"), "Update")
        Else
        End If
    End Sub
    Function RandomString(ByVal ValueLogin As String)
        Dim s As String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        Dim r As New Random
        Dim sb As New StringBuilder
        For i As Integer = 1 To 50
            Dim idx As Integer = r.Next(0, 35)
            sb.Append(s.Substring(idx, 1))
        Next
        Return sb.ToString()
    End Function
End Class