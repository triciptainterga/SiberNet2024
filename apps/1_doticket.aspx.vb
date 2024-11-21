Public Class _1_doticket
    Inherits System.Web.UI.Page

    Dim strTime As String = DateTime.Now.ToString("ddhhmmssfff")
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        TrxNumberID.Value = strTime & New Random().Next(10000, 99999)
        TrxThreadID.Value = strTime & New Random().Next(100000, 999999)
    End Sub

End Class