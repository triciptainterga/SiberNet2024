Public Class Coll_TrxUpload
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.QueryString("id") = "All" Then
            XtraUpload.SelectCommand = "select * from Coll_TrxHeader Where UploadStatus='0'"
        Else
            XtraUpload.SelectCommand = "select * from Coll_TrxHeader Where UploadID='" & Request.QueryString("id") & "'"
        End If
    End Sub

End Class