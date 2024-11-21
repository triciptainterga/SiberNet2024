Public Class Dashboard_L1
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        hd_leveluser.Value = Session("lvluser")
        hd_Org.Value = Session("Org")
        hd_Unitkerja.Value = Session("UnitKerja")
    End Sub

End Class