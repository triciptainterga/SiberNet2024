Imports System.Data
Imports System.Data.SqlClient
Public Class TrmKnowledge
    Inherits System.Web.UI.Page

    Dim con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlcom As New SqlCommand
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'If Session("LoginType") = "Admin" Then
        If Request.Querystring("type") = "Admin" Or Request.Querystring("type") = "layer2" Or Request.Querystring("type") = "Supervisor" Then
            fileManager.SettingsEditing.AllowCreate = True
            fileManager.SettingsEditing.AllowDelete = True
            fileManager.SettingsEditing.AllowRename = True
            fileManager.SettingsEditing.AllowMove = True

            fileManager.SettingsToolbar.ShowCreateButton = True
            fileManager.SettingsToolbar.ShowDownloadButton = True
            fileManager.SettingsUpload.Enabled = True
        Else
            fileManager.SettingsEditing.AllowCreate = False
            fileManager.SettingsEditing.AllowDelete = False
            fileManager.SettingsEditing.AllowRename = False
            fileManager.SettingsEditing.AllowMove = False

            fileManager.SettingsToolbar.ShowCreateButton = False
            fileManager.SettingsToolbar.ShowDownloadButton = True
            fileManager.SettingsUpload.Enabled = False
        End If
    End Sub
End Class