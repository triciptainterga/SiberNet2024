Public Class auth_login_1
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Response.Redirect("xxx.aspx?id=20")
        Response.Write("abcde")
        aaa()
        TestSim()
        ''Response.Redirect("xxx.aspx?id=20")
    End Sub
    Private Sub TestSim()
        Dim str As String = "Git Explore"
        Response.Write("Git Explore XX " & str)
    End Sub

    Private Function aaa()
        Dim abcx As String = "Hello"
        Return abcx
    End Function
End Class