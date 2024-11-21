Public Class _4_Reports
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.QueryString("rpt") = "all" Then
            divAllData.Visible = True
            divDateResponse.Visible = False
        ElseIf Request.QueryString("rpt") = "dateresponse" Then
            divAllData.Visible = False
            divDateResponse.Visible = True
        Else
            divAllData.Visible = False
            divDateResponse.Visible = False
        End If
    End Sub

End Class