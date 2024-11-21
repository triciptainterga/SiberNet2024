Imports System
Imports System.Web.UI
Imports System.Data.SqlClient
Imports Microsoft.VisualBasic
Imports System.Net.WebRequest
Imports System.Text.Encoding
Imports System.IO
Imports System.Net.ServicePointManager
Imports System.Net.Security
Imports System.Security.Cryptography.X509Certificates
Imports System.Net.SecurityProtocolType
Imports System.Net.FileWebRequest
Imports System.Runtime.Serialization
Imports System.Net
Imports System.Text
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq
Public Class Tele_AcraTesting
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub
    Private Sub postWS(ByVal urlx As String, ByVal json As String)
        Dim objBrwInfo As HttpBrowserCapabilities = Request.Browser
        Dim BrowserName As String = objBrwInfo.Browser
        Dim responstring As String = ""
        Dim dataResult As Linq.JObject
        Dim ret As String = ""
        'ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        Try
            Dim apiurl As String = "http://103.66.46.141:9009/api/v1/interaction/post"
            Dim uri As New Uri(apiurl)
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
            Dim req As WebRequest = WebRequest.Create(uri)
            Dim xml As String = "{""name"":""Jonny"",""gender"":""Pria""}"
            Dim data = Encoding.UTF8.GetBytes(xml)

            req.ContentType = "application/json"
            req.Method = "POST"
            req.ContentLength = data.Length
            req.Headers.Add("Authorization", "Basic VWlkZXNrMTIzOlVpZGVzazEyMw==")
            'Dim result_post = SendRequest(uri, data, "application/json", "POST")

            Dim stream = req.GetRequestStream()
            stream.Write(data, 0, data.Length)
            stream.Close()

            Dim response = req.GetResponse().GetResponseStream()

            Dim reader As New StreamReader(response)
            Dim res = reader.ReadToEnd()
            reader.Close()
            response.Close()

            If Not IsNothing(res) And res <> "" Then
                dataResult = Linq.JObject.Parse(res)
                If dataResult.Value(Of String)("status") = "success" Then
                    ret = "Success.aspx"
                Else
                    ret = "Error.aspx"
                End If
            End If
        Catch ex As Exception
            Response.Write(ex.Message)
            ret = "Error.aspx"
            'Response.Redirect("xx.aspx")
        End Try
        Response.Redirect(ret)
    End Sub
    Private Sub ButtonSimulasi_Click(sender As Object, e As EventArgs) Handles ButtonSimulasi.Click
        GetIPAddress()
        postWS("1", "2")
        'getPhonezendesk("123")
    End Sub
    Private Function getPhonezendesk(ByVal phonexxx As String) As String
        Dim webClient As New System.Net.WebClient
        Dim data As Linq.JObject
        Dim ret As String = ""
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        Dim creds As NetworkCredential = New NetworkCredential("Uidesk123", "Uidesk123")
        webClient.Credentials = creds

        Dim result As String = webClient.DownloadString("http://103.66.46.141:9009/api/v1/interaction/get")
        If Not IsNothing(result) And result <> "" Then
            data = Linq.JObject.Parse(result)

            If data.Value(Of Integer)("count") > 0 Then
                'Dim results As List(Of JToken) = data("results").Children
                Dim results As JEnumerable(Of JToken) = data("results").Children
                For Each item As JToken In results
                    Return item.Value(Of String)("id")
                Next
            End If
        End If
        Return ret
    End Function
    Public Shared Function GetIPAddress() As String
        Dim context As System.Web.HttpContext = System.Web.HttpContext.Current
        Dim sIPAddress As String = context.Request.ServerVariables("HTTP_X_FORWARDED_FOR")
        If String.IsNullOrEmpty(sIPAddress) Then
            Return context.Request.ServerVariables("REMOTE_ADDR")
        Else
            Dim ipArray As String() = sIPAddress.Split(New [Char]() {","c})
            Return ipArray(0)
        End If
    End Function
End Class