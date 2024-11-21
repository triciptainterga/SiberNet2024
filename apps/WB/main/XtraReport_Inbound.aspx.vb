Imports System
Imports System.Data
Imports System.Data.SqlClient
Imports System.Drawing
Imports System.IO
Imports System.Security.Cryptography
Imports DevExpress.XtraPrinting
Public Class XtraReport_Inbound
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
        XtraReporting.SelectCommand = "SELECT Tele_TrxHeader.Name, Tele_TrxHeader.CallReason, CTI_CALL_LOG.* FROM CTI_CALL_LOG LEFT OUTER JOIN Tele_TrxHeader ON cti_call_log.PHONENO = Tele_TrxHeader.Telepon WHERE CALLTYPE='INCOMING' AND STARTCALL BETWEEN '" & Format(dt_strdate.Value, "yyyy-MM-dd") & " 00:01 ' AND'" & Format(dt_endate.Value, "yyyy-MM-dd") & " 23:59'"
    End Sub

    Private Sub ASPxGridView1_Init(sender As Object, e As EventArgs) Handles ASPxGridView1.Init
        XtraReporting.SelectCommand = "SELECT Tele_TrxHeader.Name, Tele_TrxHeader.CallReason, CTI_CALL_LOG.* FROM CTI_CALL_LOG LEFT OUTER JOIN Tele_TrxHeader ON cti_call_log.PHONENO = Tele_TrxHeader.Telepon WHERE CALLTYPE='INCOMING' AND STARTCALL BETWEEN '" & Format(dt_strdate.Value, "yyyy-MM-dd") & " 00:01 ' AND'" & Format(dt_endate.Value, "yyyy-MM-dd") & " 23:59'"
    End Sub

    Private Sub ASPxGridView1_Load(sender As Object, e As EventArgs) Handles ASPxGridView1.Load
        XtraReporting.SelectCommand = "SELECT Tele_TrxHeader.Name, Tele_TrxHeader.CallReason, CTI_CALL_LOG.* FROM CTI_CALL_LOG LEFT OUTER JOIN Tele_TrxHeader ON cti_call_log.PHONENO = Tele_TrxHeader.Telepon WHERE CALLTYPE='INCOMING' AND STARTCALL BETWEEN '" & Format(dt_strdate.Value, "yyyy-MM-dd") & " 00:01 ' AND'" & Format(dt_endate.Value, "yyyy-MM-dd") & " 23:59'"
    End Sub

    Private Sub btn_Export_Click(sender As Object, e As EventArgs) Handles btn_Export.Click
        Dim casses As String = ddList.SelectedValue
        Select Case casses
            Case "xlsx"
                Dim options As New XlsExportOptions

                ASPxGridViewExporter1.WriteXlsxToResponse("InboundCall_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "xls"
                ASPxGridViewExporter1.WriteXlsToResponse("InboundCall_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "rtf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                ' ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WriteRtfToResponse("InboundCall_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "pdf"
                ASPxGridViewExporter1.Landscape = True
                ASPxGridViewExporter1.LeftMargin = 35
                ASPxGridViewExporter1.RightMargin = 30
                'ASPxGridViewExporter1.ExportedRowType = DevExpress.Web.ASPxGridView.Export.GridViewExportedRowType.All
                ASPxGridViewExporter1.MaxColumnWidth = 108
                ASPxGridViewExporter1.WritePdfToResponse("InboundCall_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
            Case "csv"
                ASPxGridViewExporter1.WriteCsvToResponse("InboundCall_" & DateTime.Now.ToString("yyyyMMddhhmmss"))
        End Select
    End Sub

End Class