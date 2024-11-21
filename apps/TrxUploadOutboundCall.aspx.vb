Imports System.IO
Public Class TrxUploadOutboundCall
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        TrxUserName.Value = Session("Username")
    End Sub
End Class