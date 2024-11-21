Public Class TrmMailSystem
    Inherits System.Web.UI.Page

    Dim _ClassFunction As New TrmMailSystem1
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        TrxUserName.Value = Session("username")
        If TrxEmailID.Value = "" Then
            Dim _TrxAutoID As String = DateTime.Now.ToString("yyyyMMddhhmmss")
            TrxEmailID.Value = _TrxAutoID & New Random().Next(1000000, 9999999)
        Else

        End If
        Dim _TrxGenerateAutoID As String = DateTime.Now.ToString("yyyyMMddhhmmss")
        TrxGenerateEmailID.Value = _TrxGenerateAutoID & New Random().Next(1000000, 9999999)
    End Sub

End Class