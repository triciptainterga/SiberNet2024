Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports System.Drawing
Imports System.IO
Imports System.Security.Cryptography
Imports DevExpress.XtraPrinting

Public Class _4_Reports_sla_new
    Inherits System.Web.UI.Page
    Dim comm, com, sqlcom, sqlcomTo As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlConnect As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sql As String = String.Empty
    Dim sqldr, read, sqlDtr As SqlDataReader
    Dim execute As New ClsConn
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub
    Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
        Dim queryInsert As String = "exec R_SLA_new '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'"

        com = New SqlCommand(queryInsert, con)
        Try
            con.Open()
            com.ExecuteNonQuery()
            con.Close()

        Catch ex As Exception
            Response.Write(DirectCast(ex.Message() & "_exec R_SLA_new '" & Session("UserName") & "','" & Format(dt_strdate.Value, "yyyy-MM-dd") & "','" & Format(dt_endate.Value, "yyyy-MM-dd") & "'", String))
        End Try

        ASPxGridView1.DataBind()
    End Sub

    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        tempTrxSLA.SelectCommand = "exec [R_SLA_New_Select] '" & Session("UserName") & "'"
        'tempTrxSLA.SelectCommand = "select *,10000 as Amount,dbo.udf_StripHTML(Description) as DescriptionNonHtml from [4_Report_sla] where Username='" & Session("UserName") & "'"
    End Sub

    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        tempTrxSLA.SelectCommand = "exec [R_SLA_New_Select] '" & Session("UserName") & "'"
        'tempTrxSLA.SelectCommand = "select *,10000 as Amount,dbo.udf_StripHTML(Description) as DescriptionNonHtml from [4_Report_sla] where Username='" & Session("UserName") & "'"
    End Sub

    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                Dim options As New XlsExportOptions

                ASPxGridViewExporter1.WriteXlsxToResponse("ReportSLA_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("ReportSLA_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            'Case "rtf"
            '    ASPxGridViewExporter1.Landscape = True
            '    ASPxGridViewExporter1.LeftMargin = 35
            '    ASPxGridViewExporter1.RightMargin = 30
            '    ' ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
            '    ASPxGridViewExporter1.MaxColumnWidth = 108
            '    ASPxGridViewExporter1.WriteRtfToResponse("ReportSLA_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            'Case "pdf"
            '    ASPxGridViewExporter1.Landscape = True
            '    ASPxGridViewExporter1.LeftMargin = 35
            '    ASPxGridViewExporter1.RightMargin = 30
            '    'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
            '    ASPxGridViewExporter1.MaxColumnWidth = 108
            '    ASPxGridViewExporter1.WritePdfToResponse("ReportSLA_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("ReportSLA_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub
    Public Function MyStripHtmlTagsMethod(ByVal HTMLCode As String) As String
        Return System.Text.RegularExpressions.Regex.Replace(
           HTMLCode, "<[^>]*>", "")
    End Function
End Class