Public Class TrmCustomerDashboard
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        TrxCustomerID.Value = Session("CustomerID")
    End Sub

End Class