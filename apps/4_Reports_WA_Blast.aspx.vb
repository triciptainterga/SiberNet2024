Public Class _4_Reports_WA_Blast
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Private Sub btn_Submit_Click(sender As Object, e As EventArgs) Handles btn_Submit.Click
        SqlDataSource1.SelectCommand = "SELECT [Nama], [Provinsi], [Kabupaten], [PJBU], [TemplateName], [GroupBlast], [StatusBlast], [DateSent] FROM [WA_vw_Reports] where DateSent Between '" & dt_strdate.Value & " 00:00:00' and '" & dt_endate.Value & " 23:59:59' "
    End Sub

    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                ASPxGridViewExporter1.WriteXlsxToResponse("ReportingBaseonStaf_" & DateTime.Now.ToString("yyyy_MM_dd_hh_mm"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("ReportingBaseonStaf_" & DateTime.Now.ToString("yyyy_MM_dd_hh_mm"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("ReportingBaseonStaf_" & DateTime.Now.ToString("yyyy_MM_dd_hh_mm"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("ReportingBaseonStaf_" & DateTime.Now.ToString("yyyy_MM_dd_hh_mm"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("ReportingBaseonStaf_" & DateTime.Now.ToString("yyyy_MM_dd_hh_mm"))
        End Select
    End Sub
End Class