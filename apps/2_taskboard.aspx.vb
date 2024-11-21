Public Class _2_taskboard
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'dataSourceGridList(Request.QueryString("status"), Session("LoginTypeAngka"), Session("organization"), Session("UserName"))
    End Sub
    Private Sub dataSourceGridList(ByVal statusData As String, ByVal LoginTypeAngka As String, ByVal Divisi As String, ByVal UserName As String)
        'dsTodolist.SelectCommand = "exec NEW_Sp_Open '" & UserName & "','" & statusData & "','" & LoginTypeAngka & "','" & Divisi & "'"
        'lblSql.Text = "exec NEW_Sp_Open '" & UserName & "','" & statusData & "','" & LoginTypeAngka & "','" & Divisi & "'"
    End Sub
End Class