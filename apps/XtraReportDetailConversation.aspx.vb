﻿Imports System
Imports System.Data
Imports System.Data.SqlClient
Public Class XtraReportDetailConversation
    Inherits System.Web.UI.Page

    Dim comm, com, sqlcom, sqlcomTo As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlConnect As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sql As String = String.Empty
    Dim sqldr, read, sqlDtr As SqlDataReader
    Dim execute As New ClsConn
    Dim VariabelCookiesUsername As New HttpCookie("CookiesUserName")
    Public AddCookiess As String = ConfigurationManager.AppSettings.Item("AddCookiess")
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        VariabelCookiesUsername.Values("CookiesUserName") = "Admin"
        VariabelCookiesUsername.Expires = DateTime.Now.AddDays(AddCookiess)
        Response.Cookies.Add(VariabelCookiesUsername)
    End Sub
    Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
        Dim Param As String = Request.QueryString("type")
        Dim queryInsert As String = "EXEC UIDESK_MULTICHAT_HISTORY '22','" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
        com = New SqlCommand(queryInsert, con)
        Try
            con.Open()
            com.CommandTimeout = 180
            com.ExecuteNonQuery()
            con.Close()
        Catch ex As Exception
            Response.Write(DirectCast(ex.Message() & "_exec Call_XtraRepot_CallHistory EXEC UIDESK_MULTICHAT_HISTORY '22','" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'", String))
        End Try
        ASPxGridView1.DataBind()
    End Sub
    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        'Dim Param As String = Request.QueryString("type")
        'TempBaseTrx.SelectCommand = "EXEC UIDESK_MULTICHAT_HISTORY '" & Param & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
        TempBaseTrx.SelectCommand = "EXEC SP_t_UIDESK_MULTICHAT_HISTORY '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
    End Sub
    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        'Dim Param As String = Request.QueryString("type")
        'TempBaseTrx.SelectCommand = "EXEC UIDESK_MULTICHAT_HISTORY '" & Param & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
        TempBaseTrx.SelectCommand = "EXEC SP_t_UIDESK_MULTICHAT_HISTORY '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
    End Sub
    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("ReportMultiChat_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("ReportMultiChat_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("ReportMultiChat_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("ReportMultiChat_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("ReportMultiChat_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub
    'Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
    '    Dim Param As String = Request.QueryString("type")
    '    Dim queryInsert As String = "EXEC UIDESK_MULTICHAT_HISTORY '" & Param & "','" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
    '    com = New SqlCommand(queryInsert, con)
    '    Try
    '        con.Open()
    '        com.ExecuteNonQuery()
    '        con.Close()
    '    Catch ex As Exception
    '        Response.Write(DirectCast(ex.Message() & "_exec Call_XtraRepot_CallHistory EXEC UIDESK_MULTICHAT_HISTORY '" & Param & "','" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'", String))
    '    End Try
    '    ASPxGridView1.DataBind()
    'End Sub
    'Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
    '    'Dim Param As String = Request.QueryString("type")
    '    'TempBaseTrx.SelectCommand = "EXEC UIDESK_MULTICHAT_HISTORY '" & Param & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
    '    TempBaseTrx.SelectCommand = "select * from t_UIDESK_MULTICHAT_HISTORY"
    'End Sub
    'Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
    '    'Dim Param As String = Request.QueryString("type")
    '    'TempBaseTrx.SelectCommand = "EXEC UIDESK_MULTICHAT_HISTORY '" & Param & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"
    '    TempBaseTrx.SelectCommand = "select * from t_UIDESK_MULTICHAT_HISTORY"
    'End Sub
    'Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
    '    Dim casses As String = ddList.SelectedValue
    '    Select Case casses
    '        Case "xlsx"
    '            ASPxGridViewExporter1.WriteXlsxToResponse("ReportMultiChat_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
    '        Case "xls"
    '            ASPxGridViewExporter1.WriteXlsToResponse("ReportMultiChat_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
    '        Case "rtf"
    '            ASPxGridViewExporter1.Landscape = True
    '            ASPxGridViewExporter1.LeftMargin = 35
    '            ASPxGridViewExporter1.RightMargin = 30
    '            'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
    '            ASPxGridViewExporter1.MaxColumnWidth = 108
    '            ASPxGridViewExporter1.WriteRtfToResponse("ReportMultiChat_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
    '        Case "pdf"
    '            ASPxGridViewExporter1.Landscape = True
    '            ASPxGridViewExporter1.LeftMargin = 35
    '            ASPxGridViewExporter1.RightMargin = 30
    '            'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
    '            ASPxGridViewExporter1.MaxColumnWidth = 108
    '            ASPxGridViewExporter1.WritePdfToResponse("ReportMultiChat_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
    '        Case "csv"
    '            ASPxGridViewExporter1.WriteCsvToResponse("ReportMultiChat_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
    '    End Select
    'End Sub

End Class