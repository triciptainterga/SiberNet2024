Imports System.ComponentModel
Imports System.Web
Imports System.Web.Services
Imports System.Web.Script.Services
Imports System.Web.Services.Protocols
Imports System.Web.Script.Serialization
Imports System.Data
Imports System.Data.SqlClient
Imports System.Net
Imports System.IO
Imports System.Xml
Imports System.Data.OleDb
Imports System.Data.Common
Imports System.Net.Mail
Imports System.Configuration
Imports System.Net.Configuration
Imports System.Web.HttpException
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class Out_TrxUpload1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim FileTelemarketing As String = "~/FileOutbound/"
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim Proses As New ClsConn
    Public Class Response
        Public Guid As Guid
        Public Toggle As Boolean
        Public DateNya As String
        Public FileName As String
        Public FileExt As String
        Public UploadID As String
    End Class
    Public Class listFileUpload
        Public Property Result As String
        Public Property NameNya As String
        Public Property StatusNya As String
        Public Property FileId As Guid
        Public Property FileExt As String
    End Class
    Public Class resultInsert
        Public Property Result As String
        Public Property TrxmsgSystem As String
    End Class
    <WebMethod>
    Public Sub LogSuccess(ByVal agentName As String, strValue As String)
        Dim message As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
        message += Environment.NewLine
        message += "---------------------------Success-------------------------------------------------------"
        message += Environment.NewLine
        message += String.Format("Message: {0}", strValue)
        message += Environment.NewLine
        message += "---------------------------Success-------------------------------------------------------"
        message += Environment.NewLine

        Try
            Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy")))
            If Not System.IO.Directory.Exists(DirectoryX) Then
                System.IO.Directory.CreateDirectory(DirectoryX)
            End If
        Catch exX As Exception
            ''Try catch untuk error create folder
            Dim pathXX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Dim messageXX As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
            messageXX += Environment.NewLine
            messageXX += "---------------------------Success-------------------------------------------------------"
            messageXX += Environment.NewLine
            messageXX += String.Format("Message: {0}", exX.Message)
            messageXX += Environment.NewLine
            messageXX += String.Format("StackTrace: {0}", exX.StackTrace)
            messageXX += Environment.NewLine
            messageXX += String.Format("Source: {0}", exX.Source)
            messageXX += Environment.NewLine
            messageXX += String.Format("TargetSite: {0}", exX.TargetSite.ToString())
            messageXX += Environment.NewLine
            messageXX += "---------------------------Success-------------------------------------------------------"
            messageXX += Environment.NewLine
            Using writer As New StreamWriter(pathXX, True)
                writer.WriteLine(messageXX)
                writer.Close()
            End Using
        Finally
            Dim pathX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Using writer As New StreamWriter(pathX, True)
                writer.WriteLine(message)
                writer.Close()
            End Using
        End Try
    End Sub
    Public Sub LogError(ByVal agentName As String, ex As Exception, strUser As String)
        Dim message As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
        message += Environment.NewLine
        message += "---------------------------Failed-------------------------------------------------------"
        message += Environment.NewLine
        message += String.Format("Message: {0}", strUser)
        message += Environment.NewLine
        message += String.Format("Message: {0}", ex.Message)
        message += Environment.NewLine
        message += String.Format("StackTrace: {0}", ex.StackTrace)
        message += Environment.NewLine
        message += String.Format("Source: {0}", ex.Source)
        message += Environment.NewLine
        message += String.Format("TargetSite: {0}", ex.TargetSite.ToString())
        message += Environment.NewLine
        message += "---------------------------Failed-------------------------------------------------------"
        message += Environment.NewLine

        Try
            Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy")))
            If Not System.IO.Directory.Exists(DirectoryX) Then
                System.IO.Directory.CreateDirectory(DirectoryX)
            End If
        Catch exX As Exception
            ''Try catch untuk error create folder
            Dim pathXX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Dim messageXX As String = String.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss:fff tt"))
            messageXX += Environment.NewLine
            messageXX += "---------------------------Failed-----------------------------------------------"
            messageXX += Environment.NewLine
            messageXX += String.Format("Message: {0}", strUser)
            messageXX += Environment.NewLine
            messageXX += String.Format("Message: {0}", exX.Message)
            messageXX += Environment.NewLine
            messageXX += String.Format("StackTrace: {0}", exX.StackTrace)
            messageXX += Environment.NewLine
            messageXX += String.Format("Source: {0}", exX.Source)
            messageXX += Environment.NewLine
            messageXX += String.Format("TargetSite: {0}", exX.TargetSite.ToString())
            messageXX += Environment.NewLine
            messageXX += "---------------------------Failed------------------------------------------------"
            messageXX += Environment.NewLine
            Using writer As New StreamWriter(pathXX, True)
                writer.WriteLine(messageXX)
                writer.Close()
            End Using
        Finally
            Dim pathX As String = HttpContext.Current.Server.MapPath("~/apps/ErrorLog/" & agentName & "/" & DateTime.Now.ToString("ddMMyyyy") & "/" & DateTime.Now.ToString("ddMMyyyy") & ".txt")
            Using writer As New StreamWriter(pathX, True)
                writer.WriteLine(message)
                writer.Close()
            End Using
        End Try
    End Sub
    <WebMethod(EnableSession:=True)>
    Public Function OutboundUpload_1() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/FileOutbound/")
        Dim ProdukID As String = HttpContext.Current.Request.Form("ProdukID")
        Dim uploadby As String = HttpContext.Current.Request.Form("Username")
        'Dim uploadid As String = HttpContext.Current.Request.Form("UploadID").Replace("..", "")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileId As Guid

        Dim DirectoryX As String = Path.Combine(Server.MapPath(FileTelemarketing & "" & strTime.Replace("..", "")))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        End If
        For i As Integer = 0 To Files.Count - 1
            Dim File As HttpPostedFile = Files(i)
            FileId = Guid.NewGuid()
            FileName = File.FileName
            FileExt = Path.GetExtension(File.FileName)

            Dim FileMod As DateTime = DateTime.Now
            Dim FileType As String = File.ContentType
            Dim FileSize As Long = File.ContentLength

            Dim validFileTypes As String() = {"xls", "xlsx"}
            Dim isValidFile As Boolean = False
            For j As Integer = 0 To validFileTypes.Length - 1
                If FileExt = "." & validFileTypes(j) Then
                    'Dim FilePath As String = "/FileReportUpload/"

                    Dim FilePath As String = FileTelemarketing & "" & strTime.Replace("..", "") & "/"
                    File.SaveAs(Path.Combine(SavePath, strTime.Replace("..", "") & "/" & String.Concat(FileId, FileExt)))
                Else
                End If
            Next
        Next
        Response.Guid = FileId
        Response.FileName = FileName
        Response.FileExt = FileExt
        Response.UploadID = strTime
        'Select Case* From OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; 
        'HDR = NO; IMEX=1; Database=\\ptmkpwa12dev08.pertamina.com\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035E04e082.xlsx', 'SELECT * FROM [Sheet1$]')

        '' --> Function Kondisi Jika Server Database beda dengan Applikasi <--
        Dim FileCopy As String = ConfigurationManager.AppSettings("FileCopy")
        Dim FileCopyUser As String = ConfigurationManager.AppSettings("FileCopyUser")
        Dim FileCopyAccess As String = ConfigurationManager.AppSettings("FileCopyAccess")
        ''Dim objBrwInfo As HttpBrowserCapabilities = Request.Browser
        'Dim BrowserName As String = objBrwInfo.Browser
        Dim context As System.Web.HttpContext = System.Web.HttpContext.Current
        Dim sIPAddress As String = context.Request.ServerVariables("HTTP_X_FORWARDED_FOR")
        Dim IPAddress As String = ""
        If String.IsNullOrEmpty(sIPAddress) Then
            IPAddress = context.Request.ServerVariables("REMOTE_ADDR")
        Else
            IPAddress = sIPAddress
        End If
        If String.IsNullOrEmpty(sIPAddress) Then
            IPAddress = context.Request.ServerVariables("REMOTE_ADDR")
        Else
            IPAddress = sIPAddress
        End If
        Dim responstring As String = ""
        Dim dataResult As Linq.JObject
        Dim ret As String = ""

        ''' --> Function Kondisi Jika Server Database beda dengan Applikasi <--
        ''ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        'Try
        '    'Dim apiurl As String = "http://192.168.37.28/movefile/copyfile.php"
        '    Dim apiurl As String = FileCopy
        '    Dim uri As New Uri(apiurl)
        '    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12
        '    Dim req As WebRequest = WebRequest.Create(uri)
        '    Dim json As String = "{""asal"":""FileOutbound/" & strTime & "/" & String.Concat(FileId, FileExt) & """,""tujuan"":""FileOutbound/" & strTime & "/" & String.Concat(FileId, FileExt) & """, ""app"":""UIDESK_V2""}"
        '    'Dim json As String = "{""userLogin"":""00203754"",""password"":""P@ssw0rd"",""channelId"":""BRIQIS"",""userAgent"":""" & BrowserName & """,""ipAddress"":""" & IPAddress & """}"
        '    Dim data = Encoding.UTF8.GetBytes(json)

        '    req.ContentType = "application/json"
        '    req.Method = "POST"
        '    req.ContentLength = data.Length
        '    'req.Headers.Add("Authorization", "Basic Y29udGFjdENlbnRlcjpDMG50NGN0QzNudGVyITE0MDE3")
        '    req.Headers.Add("Authorization", "Basic " & EncodeTo64(FileCopyUser & ":" & FileCopyAccess) & "")
        '    'Dim result_post = SendRequest(uri, data, "application/json", "POST")

        '    Dim stream = req.GetRequestStream()
        '    stream.Write(data, 0, data.Length)
        '    stream.Close()

        '    Dim responseWS = req.GetResponse().GetResponseStream()

        '    Dim reader As New StreamReader(responseWS)
        '    Dim res = reader.ReadToEnd()
        '    reader.Close()
        '    responseWS.Close()

        '    'If Not IsNothing(res) And res <> "" Then
        '    '    dataResult = Linq.JObject.Parse(res)
        '    '    If dataResult.Value(Of String)("responseMessage") <> "False" Then
        '    '        AccessLogin(Login_Username.Value, Login_Password.Value)
        '    '        'ret = "auth_login.aspx?val1=" & dataResult.Value(Of String)("responseMessage") & "&browser=" & BrowserName & "&ipaddress=127"
        '    '    Else
        '    '        _ClassFunction.LogSuccess(strLogTime, json)
        '    '        Login_NotifErr.Visible = True
        '    '        'ret = "auth_login.aspx?val2=" & dataResult.Value(Of String)("responseMessage") & "&browser=" & BrowserName & "&ipaddress=127"
        '    '    End If
        '    'End If

        'Catch ex As Exception
        '    'Response.Write(ex.Message)
        '    'ret = "Error.aspx"
        '    'Response.Redirect("xx.aspx")
        '    'Login_NotifErr.Visible = True
        'End Try
        '' --> Function Kondisi Jika Server Database beda dengan Applikasi <--

        Dim stringNya As String = ""
        Dim UrlFileName As String = FileTelemarketing & strTime & "/" & String.Concat(FileId) & "." & FileExt
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Out_Excel"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("FolderName", strTime)
                sqlComm.Parameters.AddWithValue("FileName", String.Concat(FileId))
                sqlComm.Parameters.AddWithValue("UserName", uploadby)
                sqlComm.Parameters.AddWithValue("UrlFileName", UrlFileName)
                sqlComm.Parameters.AddWithValue("ProdukID", ProdukID)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            stringNya = "exec Out_Excel '" & strTime & "','" & String.Concat(FileId) & "','" & uploadby & "','" & UrlFileName & "','" & ProdukID & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, stringNya)
        Finally
            stringNya = "exec Out_Excel '" & strTime & "','" & String.Concat(FileId) & "','" & uploadby & "','" & UrlFileName & "','" & ProdukID & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), stringNya)
        End Try


        '''Coba new
        'Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        'Dim Name, Email, Telepon, BirthDate, Gender, JobTitle, Status, Address As String

        'Dim UrlFileName As String = FileTelemarketing & strTime & "/" & String.Concat(FileId) & "." & FileExt
        'Try
        '    Dim path As String = HttpContext.Current.Server.MapPath("~/FileOutbound/" & strTime.Replace("..", "") & "/" & String.Concat(FileId, FileExt))
        '    'Dim pathNya As String = "E:\#2020\RND\Helpdesk_Wagent\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx"
        '    Dim excelCS As String = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Database={0};Extended Properties=Excel 12.0;HDR=NO; IMEX=1;", path)

        '    'Dim sqlImport As String = "SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; " &
        '    '                           "HDR=NO; IMEX=1; Database=E:\#2020\RND\Helpdesk_Wagent\UploadFile\" & String.Concat(FileId) & ".xlsx', 'SELECT *,''" & String.Concat(FileId) & "'' as IDupload FROM [Sheet1$]')"
        '    Dim sqlImport As String = "exec Out_Excel '" & strTime & "','" & String.Concat(FileId) & "'"
        '    Dim cmd As SqlCommand = New SqlCommand(sqlImport, sqlconManual)
        '    cmd.CommandType = CommandType.Text

        '    sqlconManual.Open()
        '    Dim rdr As SqlDataReader = cmd.ExecuteReader()
        '    Dim strExec As String = String.Empty
        '    Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        '    While rdr.Read()
        '        'If insertTable("bulkDataUpload", "nopek, Nama, Realisasi, IDupload, SourceTest,DateRealisasi", "" & rdr("F1").ToString & "," & rdr("F2").ToString & "," & rdr("F3").ToString & "," & rdr("IDupload").ToString & "," & rdr("F4").ToString & "," & rdr("F5").ToString & "") = True Then
        '        Name = rdr("F1").ToString
        '        Email = rdr("F2").ToString
        '        Telepon = rdr("F3").ToString
        '        BirthDate = rdr("F4").ToString
        '        Gender = rdr("F5").ToString
        '        JobTitle = rdr("F6").ToString
        '        Status = rdr("F7").ToString
        '        Address = rdr("F8").ToString

        '        Try
        '            Using con As New SqlConnection(constr)
        '                Dim sqlComm As New SqlCommand()
        '                sqlComm.Connection = con
        '                sqlComm.CommandText = "Out_Upload"
        '                sqlComm.CommandType = CommandType.StoredProcedure
        '                sqlComm.Parameters.AddWithValue("Name", Name)
        '                sqlComm.Parameters.AddWithValue("Email", Email)
        '                sqlComm.Parameters.AddWithValue("Telepon", Telepon)
        '                sqlComm.Parameters.AddWithValue("BirthDate", BirthDate)
        '                sqlComm.Parameters.AddWithValue("Gender", Gender)
        '                sqlComm.Parameters.AddWithValue("JobTitle", JobTitle)
        '                sqlComm.Parameters.AddWithValue("Status", Status)
        '                sqlComm.Parameters.AddWithValue("Address", Address)
        '                sqlComm.Parameters.AddWithValue("ProdukID", ProdukID)
        '                sqlComm.Parameters.AddWithValue("uploadID", strTime)
        '                sqlComm.Parameters.AddWithValue("uploadBy", uploadby)
        '                sqlComm.Parameters.AddWithValue("UrlFileName", UrlFileName)
        '                con.Open()
        '                sqlComm.ExecuteNonQuery()
        '            End Using
        '        Catch ex As Exception
        '            strExec = "exec Out_Upload '" & Name & "','" & Email & "','" & Telepon & "','" & BirthDate & "','" & Gender & "','" & JobTitle & "','" & Status & "','" & Address & "','" & ProdukID & "','" & strTime & "','" & uploadby & "','" & UrlFileName & "'"
        '            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        '        Finally
        '            strExec = "exec Out_Upload '" & Name & "','" & Email & "','" & Telepon & "','" & BirthDate & "','" & Gender & "','" & JobTitle & "','" & Status & "','" & Address & "','" & ProdukID & "','" & strTime & "','" & uploadby & "','" & UrlFileName & "'"
        '            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        '        End Try
        '        'End If
        '    End While
        'Catch __unusedException1__ As Exception
        'Finally
        '    'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        'End Try
        Return Response
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DistributeData(ByVal TrxUploadID As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        'Dim TrxNewPasswordXSS As String = AntiXssEncoder.HtmlEncode(TrxNote.Trim, True)
        'Dim TrxEmailAddressXSS As String = AntiXssEncoder.HtmlEncode(TrxEmailAddress.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim _Result As String = String.Empty
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Out_DistibuteData"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("@TrxUploadID", TrxUploadID)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Out_DistibuteData '" & TrxUploadID & "','" & TrxUserName & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec Out_DistibuteData '" & TrxUploadID & "','" & TrxUserName & "','" & TrxAction & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DistributeDelete(ByVal TrxUploadID As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        'Dim TrxNewPasswordXSS As String = AntiXssEncoder.HtmlEncode(TrxNote.Trim, True)
        'Dim TrxEmailAddressXSS As String = AntiXssEncoder.HtmlEncode(TrxEmailAddress.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim _Result As String = String.Empty
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Out_DistibuteData"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("@TrxUploadID", TrxUploadID)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Out_DistibuteData '" & TrxUploadID & "','" & TrxUserName & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec Out_DistibuteData '" & TrxUploadID & "','" & TrxUserName & "','" & TrxAction & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    Public Shared Function EncodeTo64(ByVal toEncode As String) As String
        Dim toEncodeAsBytes As Byte() = System.Text.ASCIIEncoding.ASCII.GetBytes(toEncode)
        Dim returnValue As String = System.Convert.ToBase64String(toEncodeAsBytes)
        Return returnValue
    End Function
End Class