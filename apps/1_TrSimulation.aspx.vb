
Imports System.IO
Imports System.Text
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration
Imports System.Security.Cryptography

Public Class _1_TrSimulation
    Inherits System.Web.UI.Page

    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim _ClassFunction As New WebServiceTransaction
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Text2.Value = strTime & New Random().Next(1000000, 9999999)
        Text3.Value = strTime & New Random().Next(100000000, 999999999)
    End Sub
    Private Function Encrypt(clearText As String) As String
        Dim EncryptionKey As String = "MAKV2SPBNI99212"
        Dim clearBytes As Byte() = Encoding.Unicode.GetBytes(clearText)
        Using encryptor As Aes = Aes.Create()
            Dim pdb As New Rfc2898DeriveBytes(EncryptionKey, New Byte() {&H49, &H76, &H61, &H6E, &H20, &H4D, _
             &H65, &H64, &H76, &H65, &H64, &H65, _
             &H76})
            encryptor.Key = pdb.GetBytes(32)
            encryptor.IV = pdb.GetBytes(16)
            Using ms As New MemoryStream()
                Using cs As New CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write)
                    cs.Write(clearBytes, 0, clearBytes.Length)
                    cs.Close()
                End Using
                clearText = Convert.ToBase64String(ms.ToArray())
            End Using
        End Using
        labelEncrypt.Text = clearText
        Return clearText
    End Function
    Private Function Decrypt(cipherText As String) As String
        Dim EncryptionKey As String = "MAKV2SPBNI99212"
        Dim cipherBytes As Byte() = Convert.FromBase64String(cipherText)
        Using encryptor As Aes = Aes.Create()
            Dim pdb As New Rfc2898DeriveBytes(EncryptionKey, New Byte() {&H49, &H76, &H61, &H6E, &H20, &H4D, _
             &H65, &H64, &H76, &H65, &H64, &H65, _
             &H76})
            encryptor.Key = pdb.GetBytes(32)
            encryptor.IV = pdb.GetBytes(16)
            Using ms As New MemoryStream()
                Using cs As New CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write)
                    cs.Write(cipherBytes, 0, cipherBytes.Length)
                    cs.Close()
                End Using
                cipherText = Encoding.Unicode.GetString(ms.ToArray())
            End Using
        End Using
        Return cipherText
    End Function
    Private Sub Button1_ServerClick(sender As Object, e As EventArgs) Handles Button1.ServerClick
        'md5(txtPassword.Text)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Using con As New SqlConnection(constr)
            Using cmd As New SqlCommand("INSERT INTO UIDESK_logChangePassword(TrxPassword) VALUES(@TrxPassword)")
                cmd.CommandType = CommandType.Text
                'cmd.Parameters.AddWithValue("@TrxPassword", Encrypt(txtPassword.Text.Trim()))
                cmd.Parameters.AddWithValue("@TrxPassword", _ClassFunction.Encrypt(txtPassword.Text.Trim()))
                cmd.Connection = con
                con.Open()
                cmd.ExecuteNonQuery()
                con.Close()
            End Using
        End Using
    End Sub
    Private Sub Button2_ServerClick(sender As Object, e As EventArgs) Handles Button2.ServerClick
        labelDecrypt.Text = Decrypt(labelEncrypt.Text)
        labelDecrypt.Text = _ClassFunction.Decrypt(labelEncrypt.Text)
    End Sub
End Class