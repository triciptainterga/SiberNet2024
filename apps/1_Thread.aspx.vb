Public Class _1_Thread
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Session("LoginType") = "Supervisor" Or Session("LoginType") = "Administrator" Then
            TrxUnitKerja.Value = Session("UnitKerja")
            TrxLevelUser.Value = Session("lvluser")
        Else
            TrxUnitKerja.Value = Session("UserName")
            TrxLevelUser.Value = Session("lvluser")
        End If
    End Sub

End Class