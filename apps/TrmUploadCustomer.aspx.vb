Public Class TrmUploadCustomer
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        TrxUserName.Value = Session("UserName")
    End Sub

End Class