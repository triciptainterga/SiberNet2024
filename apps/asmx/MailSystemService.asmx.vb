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
Imports System.Web.Security.AntiXss

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
<ScriptService()>
<ToolboxItem(False)> _
Public Class MailSystemService
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn
    Dim _RootAttachmentInboxEmail As String = "~/FileEmail/INBOX/"
    Dim _RootAttachmentOutboxEmail As String = "~/FileEmail/OUTBOX/"
    Public Class Response
        Public Guid As Guid
        Public Toggle As Boolean
        Public DateNya As String
        Public FileName As String
        Public FileExt As String
        Public FileSizing As String
        Public ResultUpload As String
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
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property TrxmsgSystem As String
        Public Property TicketNumber As String
        Public Property TrxID As String
        Public Property TrxTo As String
        Public Property TrxSubject As String
        Public Property TrxCC As String
    End Class
    Public Class listTransactionCustomer
        Public Property Result As String
        Public Property TrxID As String
        Public Property TrxThreadChannel As String
        Public Property TrxIconThreadChannel As String
        Public Property TrxThreadID As String
        Public Property TrxThreadNumberID As String
        Public Property TrxThreadAccount As String
        Public Property TrxThreadContactID As String
        Public Property TrxThreadaAgentID As String
        Public Property TrxThreadSubject As String
        Public Property TrxThreadTicketNumber As String
        Public Property TrxThreadCustomer As String
        Public Property TrxThreadaDateCreate As String
    End Class
    Public Function ConvertDataTabletoString(ByVal dt As DataTable) As String
        Dim serializer As System.Web.Script.Serialization.JavaScriptSerializer = New System.Web.Script.Serialization.JavaScriptSerializer()
        Dim rows As List(Of Dictionary(Of String, Object)) = New List(Of Dictionary(Of String, Object))()
        Dim row As Dictionary(Of String, Object)

        For Each dr As DataRow In dt.Rows
            row = New Dictionary(Of String, Object)()

            For Each col As DataColumn In dt.Columns
                row.Add(col.ColumnName, dr(col))
            Next

            rows.Add(row)
        Next

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        js.MaxJsonLength = Int32.MaxValue
        Return js.Serialize(rows)
    End Function
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
    Public Function UploadFile() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim TrxUserCreate As String = HttpContext.Current.Request.Form("Username")
        Dim Emailid As String = HttpContext.Current.Request.Form("Emailid").Replace("..", "")
        Dim SavePath As String = HttpContext.Current.Server.MapPath(_RootAttachmentOutboxEmail & "" & Emailid & "/")
        'Dim idHeader As String = HttpContext.Current.Request.Form("idHeader")
        'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileSizing As String = String.Empty
        Dim FileContent As String = String.Empty
        Dim FileId As Guid

        Dim DirectoryX As String = Path.Combine(Server.MapPath(_RootAttachmentOutboxEmail & "" & Emailid))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        End If
        For i As Integer = 0 To Files.Count - 1
            Dim File As HttpPostedFile = Files(i)
            FileId = Guid.NewGuid()
            FileName = File.FileName
            FileExt = Path.GetExtension(File.FileName)
            FileSizing = File.ContentLength

            Dim validFileTypes As String() = {"bmp", "gif", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "pdf"}
            Dim isValidFile As Boolean = False
            For j As Integer = 0 To validFileTypes.Length - 1
                If FileExt = "." & validFileTypes(j) Then

                    Dim FileMod As DateTime = DateTime.Now
                    Dim FileType As String = File.ContentType
                    Dim FileSize As Long = File.ContentLength / 1024 / 1024
                    Dim FilePath As String = _RootAttachmentOutboxEmail & "" & Emailid & "/"
                    If FileSize > 2 Then
                        Response.Guid = FileId
                        Response.FileName = FileName
                        Response.FileExt = FileExt
                        Response.FileSizing = FileSizing
                        Response.ResultUpload = "Please upload file less than 2 MB. Thanks!"
                    Else
                        File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
                        'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))
                    End If

                Else
                    'Exit Function
                End If
            Next

        Next
        Response.Guid = FileId
        Response.FileName = FileName
        Response.FileExt = FileExt
        Response.FileSizing = FileSizing
        'SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; 
        'HDR=NO; IMEX=1; Database=\\ptmkpwa12dev08.pertamina.com\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx', 'SELECT * FROM [Sheet1$]')

        ''Coba new
        Dim _TrxEmailID As String
        If Emailid = "" Then
            _TrxEmailID = DateTime.Now.ToString("ddMMyyyyhhmmss")
        Else
            _TrxEmailID = Emailid
        End If
        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        Try
            Dim path As String = HttpContext.Current.Server.MapPath(_RootAttachmentOutboxEmail & "" & Emailid & "/" & String.Concat(FileId, FileExt))
            Dim TrxUrl As String = Emailid & "/" & String.Concat(FileId, FileExt)

            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_TrxAttachmentEmail"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxEmailID", _TrxEmailID)
                    sqlComm.Parameters.AddWithValue("TrxUrl", TrxUrl)
                    sqlComm.Parameters.AddWithValue("TrxFilename", FileName)
                    sqlComm.Parameters.AddWithValue("TrxFileType", FileExt)
                    sqlComm.Parameters.AddWithValue("TrxFileSize", FileSizing)
                    sqlComm.Parameters.AddWithValue("TrxUserCreate", TrxUserCreate)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
                strExec = "exec UIDESK_TrxAttachmentEmail " & "'" & Emailid & "'," & "'" & TrxUrl & "'," & "'" & FileName & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Catch ex As Exception

                strExec = "exec UIDESK_TrxAttachmentEmail " & "'" & Emailid & "'," & "'" & TrxUrl & "'," & "'" & FileName & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally

                strExec = "exec UIDESK_TrxAttachmentEmail " & "'" & Emailid & "'," & "'" & TrxUrl & "'," & "'" & FileName & "'," & "'" & FileExt & "'," & "'" & FileSizing & "'," & "'" & TrxUserCreate & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                ''End
            End Try

        Catch __unusedException1__ As Exception

        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try
        Return Response
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetWhereRecords(ByVal tableType As String, ByVal tableName As String, ByVal paramQuery As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Using conn As SqlConnection = New SqlConnection(connstring)
            conn.Open()
            If tableType = "AllWhereData" Then

                sql = "select * from [" & tableName & "] " & paramQuery & " "
            End If
            Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
            Dim ds As DataSet = New DataSet()
            ad.Fill(ds)
            dt = ds.Tables(0)
            conn.Close()
        End Using
        Dim tableJson As String = ConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateReadingEmail(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxLayerUser As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _TrxSubject As String = String.Empty
        Dim _TrxTo As String = String.Empty
        Dim _TrxCC As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailReading"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxLayerUser", TrxLayerUser)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _TrxTo = sqldr("ETO").ToString
                    _TrxSubject = sqldr("ESUBJECT").ToString
                    _TrxCC = sqldr("ECC").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailReading '" & TrxID & "','" & TrxUserName & "','" & TrxLayerUser & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = TrxID
                objectTickets.TrxTo = _TrxTo
                objectTickets.TrxSubject = _TrxSubject
                objectTickets.TrxCC = _TrxCC
                objectTickets.TrxmsgSystem = "Data Has Been Read"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxEmailReading '" & TrxID & "','" & TrxUserName & "','" & TrxLayerUser & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = TrxID
                objectTickets.TrxTo = _TrxTo
                objectTickets.TrxSubject = _TrxSubject
                objectTickets.TrxCC = _TrxCC
                objectTickets.TrxmsgSystem = "Data Note Has Been Read"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxEmailReading '" & TrxID & "','" & TrxUserName & "','" & TrxLayerUser & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), "Data Note Has Been Read")
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertComposeEmail(ByVal TrxUserName As String, ByVal TrxTO As String, ByVal TrxSubject As String, ByVal TrxCC As String, ByVal TrxBody As String, ByVal TrxDirection As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim _TrxAutoID As String = DateTime.Now.ToString("yyyyMMddhhmmss")
        Dim _TrxEmailID = _TrxAutoID & New Random().Next(1000000, 9999999)

        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxType As String = "compose_email"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailCompose"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
                sqlComm.Parameters.AddWithValue("TrxSubject", HttpUtility.UrlDecode(TrxSubject))
                sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
                sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
                sqlComm.Parameters.AddWithValue("TrxEmailID", _TrxEmailID)
                sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailCompose '" & TrxUserNameXSS & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _TrxEmailID
                objectTickets.TrxmsgSystem = "Data Has Been Send"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxEmailCompose '" & TrxUserNameXSS & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _TrxEmailID
                objectTickets.TrxmsgSystem = "Data Has Been Send"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxEmailCompose '" & TrxUserNameXSS & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & _TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), "Data Has Been Send")
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ReplyEmail(ByVal TrxEmailID As String, ByVal TrxUserName As String, ByVal TrxTO As String, ByVal TrxSubject As String, ByVal TrxCC As String,
                               ByVal TrxBody As String, ByVal TrxDirection As String, ByVal TrxLayerUser As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty

        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)
        Dim TrxType As String = "reply_email"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailReply"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
                sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubjectXSS)
                sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
                sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
                sqlComm.Parameters.AddWithValue("TrxEmailID", TrxEmailID)
                sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
                sqlComm.Parameters.AddWithValue("TrxLayerUser", TrxLayerUser)
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailReply '" & TrxUserNameXSS & "','" & TrxTO & "','" & TrxSubjectXSS & "','" & TrxCC & "','" & TrxBody & "','" & TrxEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = TrxEmailID
                objectTickets.TrxmsgSystem = "Data Has Been Send"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxEmailReply '" & TrxUserNameXSS & "','" & TrxTO & "','" & TrxSubjectXSS & "','" & TrxCC & "','" & TrxBody & "','" & TrxEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = TrxEmailID
                objectTickets.TrxmsgSystem = "Data Has Been Send"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxEmailReply '" & TrxUserNameXSS & "','" & TrxTO & "','" & TrxSubjectXSS & "','" & TrxCC & "','" & TrxBody & "','" & TrxEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), "Data Has Been Send")
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UIDESK_TrxEmailReply_New(ByVal TrxEmailID As String, ByVal TrxUserName As String, ByVal TrxTO As String, ByVal TrxSubject As String, ByVal TrxCC As String,
                               ByVal TrxBody As String, ByVal TrxDirection As String, ByVal TrxLayerUser As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty

        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)
        Dim TrxType As String = "reply_email"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailReply_NEW"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
                sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubjectXSS)
                sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
                sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
                sqlComm.Parameters.AddWithValue("TrxEmailID", TrxEmailID)
                sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
                sqlComm.Parameters.AddWithValue("TrxLayerUser", TrxLayerUser)
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailReply_NEW '" & TrxUserName & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & TrxEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = TrxEmailID
                objectTickets.TrxmsgSystem = "Data Has Been Send"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxEmailReply_NEW '" & TrxUserName & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & TrxEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = TrxEmailID
                objectTickets.TrxmsgSystem = "Data Has Been Send"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxEmailReply_New '" & TrxUserName & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & TrxEmailID & "','" & TrxDirection & "','" & TrxLayerUser & "','" & TrxType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), "Data Has Been Send")
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SendingDraftEmail(ByVal TrxEmailID As String, ByVal TrxUserName As String, ByVal TrxTO As String, ByVal TrxSubject As String, ByVal TrxCC As String,
                               ByVal TrxBody As String, ByVal TrxDirection As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty

        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxSubjectXSS As String = AntiXssEncoder.HtmlEncode(TrxSubject.Trim, True)
        Dim TrxType As String = "compose_email"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailSendingDraft"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxTO", TrxTO)
                sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubjectXSS)
                sqlComm.Parameters.AddWithValue("TrxCC", TrxCC)
                sqlComm.Parameters.AddWithValue("TrxBody", TrxBody)
                sqlComm.Parameters.AddWithValue("TrxEmailID", TrxEmailID)
                sqlComm.Parameters.AddWithValue("TrxDirection", TrxDirection)
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailSendingDraft '" & TrxUserName & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = TrxEmailID
                objectTickets.TrxmsgSystem = "Data Has Been Send"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxEmailSendingDraft '" & TrxUserName & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = TrxEmailID
                objectTickets.TrxmsgSystem = "Data Has Been Send"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxEmailSendingDraft '" & TrxUserName & "','" & TrxTO & "','" & TrxSubject & "','" & TrxCC & "','" & TrxBody & "','" & TrxEmailID & "','" & TrxDirection & "','" & TrxType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), "Data Has Been Send")
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateEmailSpam(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxLayerUser As String) As String
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailSpam"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxLayerUser", TrxLayerUser)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailSpam '" & TrxID & "','" & TrxUserNameXSS & "','" & TrxLayerUser & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.TrxmsgSystem = "Data Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailSpam '" & TrxID & "','" & TrxUserNameXSS & "','" & TrxLayerUser & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteEmailInbox(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailInboxDelete"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailInboxDelete '" & TrxID & "','" & TrxUserNameXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.TrxmsgSystem = "Data Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailInboxDelete '" & TrxID & "','" & TrxUserNameXSS & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteEmailOutbox(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEmailOutboxDelete"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailOutboxDelete '" & TrxID & "','" & TrxUserNameXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.TrxmsgSystem = "Data Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEmailOutboxDelete '" & TrxID & "','" & TrxUserNameXSS & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteAttachmentEmail(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxDeleteEmailAttachment"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxDeleteEmailAttachment '" & TrxID & "','" & TrxUserNameXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.TrxmsgSystem = "Data Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxDeleteEmailAttachment '" & TrxID & "','" & TrxUserNameXSS & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DataTransactionEmailCounting(ByVal TrxUserName As String, ByVal TrxLevelUser As String, ByVal TrxStartDate As String, ByVal TrxEndDate As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec UIDESK_TrxEmailCounting '" & TrxUserName & "', '" & TrxLevelUser & "', '" & TrxStartDate & " 00:01', '" & TrxEndDate & " 23:59'"

                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = ConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function FilterDate(ByVal StartDate As String, ByVal EndDate As String, ByVal TrxUserName As String) As String
        Dim DateNow As String = DateTime.Now.ToString("yyyy-MM-dd")
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "select format (CONVERT(Datetime, '" + StartDate + "', 120),'ddd MMM dd yyyy') As StartDate, format (CONVERT(Datetime, '" + EndDate + "', 120),'ddd MMM dd yyyy') As FinishDate"

                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, sql)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), sql)
        End Try
        Dim tableJson As String = ConvertDataTabletoString(dt)
        Return tableJson
    End Function
End Class