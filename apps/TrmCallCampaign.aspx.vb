Public Class TrmCallCampaign
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        labelName.Text = Session("NameKaryawan")
        TrxUserName.Value = Session("UserName")
    End Sub

End Class