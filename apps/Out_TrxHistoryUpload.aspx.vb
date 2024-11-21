Public Class Out_TrxHistoryUpload
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        XtraUpload.SelectCommand = "Exec Out_HistoryDataUpload 'SELECT','0'"
    End Sub

End Class