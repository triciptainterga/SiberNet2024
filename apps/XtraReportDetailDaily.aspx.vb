﻿Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports Microsoft.SqlServer
Public Class XtraReportDetailDaily
    Inherits System.Web.UI.Page
    Dim comm, com, sqlcom, sqlcomTo As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlConnect As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sql As String = String.Empty
    Dim sqldr, read, sqlDtr As SqlDataReader
    Dim execute As New ClsConn

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'TempBaseTrx.SelectCommand = "SELECT * FROM Out_TrxDashboardDuration"
    End Sub

    Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
        Dim queryInsert As String = "exec [PBX_ReportDetailCall] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd 00:00:00") & "','" & Format(dt_endate.Value, "yyyy-MM-dd 23:59:59") & "'"
        com = New SqlCommand(queryInsert, con)
        Try
            con.Open()
            com.ExecuteNonQuery()
            com.CommandTimeout = 0
            con.Close()

        Catch ex As Exception
            Response.Write(DirectCast(ex.Message() & "_exec [Xtra_ReportDaily] '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'", String))
        End Try
        ASPxGridView1.DataBind()
    End Sub
    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        'TempBaseTrx.SelectCommand = "select CONVERT(VARCHAR(8), DATEADD(SECOND, DATEDIFF(SECOND, CHAN_START, ANSWER), 0), 108) as StartCallIVR,CONVERT(VARCHAR(8), DATEADD(SECOND, DATEDIFF(SECOND, CHAN_START, HANGUP), 0), 108) as StartCallHANGUP,CONVERT(VARCHAR(8), DATEADD(SECOND, DATEDIFF(SECOND, ANSWER, HANGUP), 0), 108) as StartIVRENDHANGUP,* from temp_PBX_ReportDaily where Username='" & Session("UserName") & "'"
        'TempBaseTrx.SelectCommand = "select ROW_NUMBER() OVER(ORDER BY TicketNumber DESC) AS NoUrut,*,10000 as Amount,dbo.udf_StripHTML(Alamat) as AlamatNonHtml,dbo.udf_StripHTML([Description]) as DescriptionNonHtml,ClosedByNew=(select [NAME] from msuser where msuser.USERNAME=NewClosedBy),
        'CreatedByNew=(select [NAME] from msuser where msuser.USERNAME=CreatedBy) from [4_Report_base_trx] where Username='" & Session("UserName") & "'"
        TempBaseTrx.SelectCommand = "exec PBX_ReportDetailCallShow '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
    End Sub
    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        'TempBaseTrx.SelectCommand = "select CONVERT(VARCHAR(8), DATEADD(SECOND, DATEDIFF(SECOND, CHAN_START, ANSWER), 0), 108) as StartCallIVR,CONVERT(VARCHAR(8), DATEADD(SECOND, DATEDIFF(SECOND, CHAN_START, HANGUP), 0), 108) as StartCallHANGUP,CONVERT(VARCHAR(8), DATEADD(SECOND, DATEDIFF(SECOND, ANSWER, HANGUP), 0), 108) as StartIVRENDHANGUP,* from temp_PBX_ReportDaily where Username='" & Session("UserName") & "'"
        'TempBaseTrx.SelectCommand = "select ROW_NUMBER() OVER(ORDER BY TicketNumber DESC) AS NoUrut,*,10000 as Amount,dbo.udf_StripHTML(Alamat) as AlamatNonHtml,dbo.udf_StripHTML([Description]) as DescriptionNonHtml,ClosedByNew=(select [NAME] from msuser where msuser.USERNAME=NewClosedBy),
        'CreatedByNew=(select [NAME] from msuser where msuser.USERNAME=CreatedBy) from [4_Report_base_trx] where Username='" & Session("UserName") & "'"
        TempBaseTrx.SelectCommand = "exec PBX_ReportDetailCallShow '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
    End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("ReportDetailCall_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("ReportDetailCall_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            'Case "rtf"
            '    ASPxGridViewExporter1.Landscape = True
            '    ASPxGridViewExporter1.LeftMargin = 35
            '    ASPxGridViewExporter1.RightMargin = 30
            '    'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
            '    ASPxGridViewExporter1.MaxColumnWidth = 108
            '    ASPxGridViewExporter1.WriteRtfToResponse("ReportDetailCall_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            'Case "pdf"
            '    ASPxGridViewExporter1.Landscape = True
            '    ASPxGridViewExporter1.LeftMargin = 35
            '    ASPxGridViewExporter1.RightMargin = 30
            '    'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
            '    ASPxGridViewExporter1.MaxColumnWidth = 108
            '    ASPxGridViewExporter1.WritePdfToResponse("ReportDetailCall_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("ReportDetailCall_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub

End Class