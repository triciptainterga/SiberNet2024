Public Class TrmLDAP
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Private Sub BTN_Submit_Click(sender As Object, e As EventArgs) Handles BTN_Submit.Click
        Dim Success As Boolean = False
        Dim Entry As New System.DirectoryServices.DirectoryEntry("LDAP://" & Txt_Server.Text & ":389", Txt_User.Text, Txt_Password.Text)
        Dim Searcher As New System.DirectoryServices.DirectorySearcher(Entry)
        Searcher.SearchScope = DirectoryServices.SearchScope.OneLevel
        Try
            Dim Results As System.DirectoryServices.SearchResult = Searcher.FindOne
            Success = Not (Results Is Nothing)
            lblhasil.Text = "LDAP Success "
        Catch ex As Exception
            Success = False
            lblhasil.Text = "LDAP Failed "
        End Try
    End Sub
End Class