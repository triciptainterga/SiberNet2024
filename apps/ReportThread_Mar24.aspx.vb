Imports System
Imports System.Data
Imports System.Data.SqlClient
Public Class ReportThread_Mar24
    Inherits System.Web.UI.Page

    Dim comm, com, sqlcom, sqlcomTo As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlConnect As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sql As String = String.Empty
    Dim sqldr, read, sqlDtr As SqlDataReader
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'SourceChannel.SelectCommand = "EXEC SP_2024_SourceChannel"
    End Sub
    Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
        Dim queryInsert As String = "exec [SP_2024_ReportThread] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "','INSERT'"
        com = New SqlCommand(queryInsert, con)
        Try
            con.Open()
            com.ExecuteNonQuery()
            con.Close()

        Catch ex As Exception
            Response.Write(DirectCast(ex.Message() & "_exec [SP_2024_ReportThread] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "','INSERT'", String))
        End Try
        ASPxGridView1.DataBind()
    End Sub
    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        tempTrxThread.SelectCommand = "exec [SP_2024_ReportThread] '" & Session("UserName") & "','2024-03-30','2024-03-30','SELECT'"
        '   tempTrxThread.SelectCommand = "select *,10000 as Amount,'0' as ThreadTicket,
        'dbo.udf_StripHTML(ThreadReason) as ThreadReasonNonHtml,AgentIDNew=(select [NAME] from msuser where msuser.USERNAME=AgentID) from [4_Report_thread] where Username='" & Session("UserName") & "'"
    End Sub
    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        tempTrxThread.SelectCommand = "exec [SP_2024_ReportThread] '" & Session("UserName") & "','2024-03-30','2024-03-30','SELECT'"
        '   tempTrxThread.SelectCommand = "select *,10000 as Amount,'0' as ThreadTicket,
        'dbo.udf_StripHTML(ThreadReason) as ThreadReasonNonHtml,AgentIDNew=(select [NAME] from msuser where msuser.USERNAME=AgentID) from [4_Report_thread] where Username='" & Session("UserName") & "'"
    End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("ReportThread_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("ReportThread_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("ReportThread_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub

End Class