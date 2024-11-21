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
Imports System.Net.WebClient
Imports System.Web.Security.AntiXss

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class TrxUploadOutboundCall1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn
    Public Class Response
        Public Guid As Guid
        Public Toggle As Boolean
        Public DateNya As String
        Public FileName As String
        Public FileExt As String
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
        Public Property msgSystem As String
        Public Property TicketNumber As String
        Public Property CustomerID As String
    End Class
    Public Class listCounting
        Public Property Result As String
        Public Property Counting As String
    End Class
    Public Enum StatementTypes
        None = 0
        Procedure = 0
        Alter = 1
        Create = 2
        Delete = 4
        Drop = 8
        Execute = 16
        Insert = 32
        [Select] = 64
        Update = 128
        Union = 256
        Batch = 512
        Merge = 1024 Or Delete Or Insert Or [Select] Or Update
    End Enum
    Public Class CommandTextValidator
        Public Shared Sub ValidateStatement(ByVal commandText As String, ByVal authorizedStatements As StatementTypes)
            'Construct Regular Expression To Find Text Blocks, Statement Breaks & SQL Statement Headers
            Dim regExText As String = "('(''|[^'])*')|(;)|(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b)"

            'Remove Authorized Options
            If (authorizedStatements And StatementTypes.Batch) = StatementTypes.Batch Then regExText = regExText.Replace("(;)", String.Empty)
            If (authorizedStatements And StatementTypes.Alter) = StatementTypes.Alter Then regExText = regExText.Replace("ALTER", String.Empty)
            If (authorizedStatements And StatementTypes.Create) = StatementTypes.Create Then regExText = regExText.Replace("CREATE", String.Empty)
            If (authorizedStatements And StatementTypes.Delete) = StatementTypes.Delete Then regExText = regExText.Replace("DELETE", String.Empty)
            If (authorizedStatements And StatementTypes.Delete) = StatementTypes.Delete Then regExText = regExText.Replace("DELETETREE", String.Empty)
            If (authorizedStatements And StatementTypes.Drop) = StatementTypes.Drop Then regExText = regExText.Replace("DROP", String.Empty)
            If (authorizedStatements And StatementTypes.Execute) = StatementTypes.Execute Then regExText = regExText.Replace("EXEC(UTE){0,1}", String.Empty)
            If (authorizedStatements And StatementTypes.Insert) = StatementTypes.Insert Then regExText = regExText.Replace("INSERT( +INTO){0,1}", String.Empty)
            If (authorizedStatements And StatementTypes.Merge) = StatementTypes.Merge Then regExText = regExText.Replace("MERGE", String.Empty)
            If (authorizedStatements And StatementTypes.Select) = StatementTypes.Select Then regExText = regExText.Replace("SELECT", String.Empty)
            If (authorizedStatements And StatementTypes.Union) = StatementTypes.Union Then regExText = regExText.Replace("UNION", String.Empty)
            If (authorizedStatements And StatementTypes.Update) = StatementTypes.Update Then regExText = regExText.Replace("UPDATE", String.Empty)

            'Remove extra separators
            Dim regExOptions As RegexOptions = RegexOptions.IgnoreCase Or RegexOptions.Multiline
            regExText = Regex.Replace(regExText, "\(\|", "(", regExOptions)
            regExText = Regex.Replace(regExText, "\|{2,}", "|", regExOptions)
            regExText = Regex.Replace(regExText, "\|\)", ")", regExOptions)

            'Check for errors
            Dim patternMatchList As MatchCollection = Regex.Matches(commandText, regExText, regExOptions)
            For patternIndex As Integer = patternMatchList.Count - 1 To 0 Step -1
                Dim value As String = patternMatchList.Item(patternIndex).Value.Trim
                If String.IsNullOrWhiteSpace(value) Then
                    'Continue - Not an error.
                ElseIf value.StartsWith("'") AndAlso value.EndsWith("'") Then
                    'Continue - Text Block
                ElseIf value.Trim = ";" Then
                    Throw New System.UnauthorizedAccessException("Batch statements not authorized:" & vbCrLf & commandText)
                Else
                    Throw New System.UnauthorizedAccessException(value.Substring(0, 1).ToUpper & value.Substring(1).ToLower & " statements not authorized:" & vbCrLf & commandText)
                End If
            Next
        End Sub
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

        Return serializer.Serialize(rows)
    End Function
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
    <WebMethod>
    Public Function UploadOutboundCall() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/FileUploadOutbound/FileNasabah/")
        Dim call_username As String = HttpContext.Current.Request.Form("Username")
        Dim ProductCampaignID As String = HttpContext.Current.Request.Form("ProductCampaignID")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileId As Guid
        For i As Integer = 0 To Files.Count - 1
            Dim File As HttpPostedFile = Files(i)
            FileId = Guid.NewGuid()
            FileName = File.FileName
            FileExt = Path.GetExtension(File.FileName).Replace("..", "")

            Dim FileSize As Long = File.ContentLength

            Dim validFileTypes As String() = {"xls", "xlsx"}
            Dim isValidFile As Boolean = False
            For j As Integer = 0 To validFileTypes.Length - 1
                If FileExt = "." & validFileTypes(j) Then

                    Dim FilePath As String = "/FileUploadOutbound/FileNasabah/"
                    File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
                    'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))

                Else
                    'Exit Function
                End If
            Next

        Next
        Response.Guid = FileId
        Response.FileName = FileName
        Response.FileExt = FileExt

        Return Response
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateUploadOutboundCall(ByVal call_upload_id As String, ByVal call_approve_by As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_Done"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", HttpUtility.UrlDecode(call_upload_id))
                sqlComm.Parameters.AddWithValue("call_approve_by", call_approve_by)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUploadOutboundCall_Done '" & HttpUtility.UrlDecode(call_upload_id) & "','" & call_approve_by & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUploadOutboundCall_Done '" & HttpUtility.UrlDecode(call_upload_id) & "','" & call_approve_by & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function CancelUploadOutboundCall(ByVal call_upload_id As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_Cancel"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", HttpUtility.UrlDecode(call_upload_id))
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUploadOutboundCall_Cancel '" & HttpUtility.UrlDecode(call_upload_id) & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUploadOutboundCall_Cancel '" & HttpUtility.UrlDecode(call_upload_id) & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetWhereRecordsFieldname(ByVal tableType As String, ByVal FieldName As String, ByVal tableName As String, ByVal paramQuery As String) As String
        'Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        'Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        'Using conn As SqlConnection = New SqlConnection(connstring)
        '    conn.Open()
        '    If tableType = "AllWhereData" Then
        '        sql = "select " & FieldName & " from [" & tableName & "] " & paramQuery & " "
        '    End If
        '    Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
        '    Dim ds As DataSet = New DataSet()
        '    ad.Fill(ds)
        '    dt = ds.Tables(0)
        '    conn.Close()
        'End Using
        'Dim tableJson As String = ConvertDataTabletoString(dt)
        'Return tableJson
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Using conn As SqlConnection = New SqlConnection(connstring)
            conn.Open()
            If tableType = "AllWhereData" Then
                Try
                    CommandTextValidator.ValidateStatement("select * from [" & tableName & "] " & paramQuery & " ", StatementTypes.Select)
                    'System.Diagnostics.Debug.WriteLine("Validation worked. The semicolon and statement are inside a text block.")
                    sql = "select " & FieldName & " from [" & tableName & "] " & paramQuery & " "
                    LogSuccess(strLogTime, sql)
                Catch ex As System.Exception
                    LogError(strLogTime, ex, sql)
                    'System.Diagnostics.Debug.WriteLine("Validation failed. The following error was thrown: " & ex.Message)
                End Try
                ' Ori sql = "select * from [" & tableName & "] " & paramQuery & " "
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
    Public Function AdminCountingDataCall(ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec UIDESK_TrxUploadAdminCountingDataCall '" & TrxUserName & "'"

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
    <WebMethod>
    Public Function UploadNamaAhliWaris() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/FileUploadOutbound/FileWaris/")
        Dim call_username As String = HttpContext.Current.Request.Form("Username")
        Dim call_upload_id As String = HttpContext.Current.Request.Form("UploadID").Replace("..", "")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileId As Guid
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
                    Dim FilePath As String = "/FileUploadOutbound/FileWaris/"
                    File.SaveAs(Path.Combine(SavePath, call_upload_id & ".xlsx"))
                Else
                End If
            Next
        Next
        Response.Guid = FileId
        Response.FileName = FileName
        Response.FileExt = FileExt
        'SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; 
        'HDR=NO; IMEX=1; Database=\\ptmkpwa12dev08.pertamina.com\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx', 'SELECT * FROM [Sheet1$]')

        '''Coba new
        'Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        'Dim call_polis_number, call_nama_ahli_waris As String

        'Try
        '    Dim path As String = HttpContext.Current.Server.MapPath("~/FileUploadOutbound/FileWaris/" & String.Concat(FileId, FileExt))
        '    'Dim pathNya As String = "E:\#2020\RND\Helpdesk_Wagent\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx"
        '    Dim excelCS As String = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Database={0};Extended Properties=Excel 12.0;HDR=NO; IMEX=1;", path)

        '    'Dim sqlImport As String = "SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; " &
        '    '                           "HDR=NO; IMEX=1; Database=E:\#2020\RND\Helpdesk_Wagent\UploadFile\" & String.Concat(FileId) & ".xlsx', 'SELECT *,''" & String.Concat(FileId) & "'' as IDupload FROM [Sheet1$]')"
        '    Dim sqlImport As String = "exec UIDESK_TrxUploadOutboundWaris_SelectExcel '" & String.Concat(FileId) & "'"
        '    Dim cmd As SqlCommand = New SqlCommand(sqlImport, sqlconManual)
        '    cmd.CommandType = CommandType.Text

        '    sqlconManual.Open()
        '    Dim rdr As SqlDataReader = cmd.ExecuteReader()
        '    Dim strExec As String = String.Empty
        '    Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        '    While rdr.Read()
        '        'If insertTable("bulkDataUpload", "nopek, Nama, Realisasi, IDupload, SourceTest,DateRealisasi", "" & rdr("F1").ToString & "," & rdr("F2").ToString & "," & rdr("F3").ToString & "," & rdr("IDupload").ToString & "," & rdr("F4").ToString & "," & rdr("F5").ToString & "") = True Then
        '        call_polis_number = rdr("F1").ToString
        '        call_nama_ahli_waris = rdr("F2").ToString

        '        Try
        '            Using con As New SqlConnection(constr)
        '                Dim sqlComm As New SqlCommand()
        '                sqlComm.Connection = con
        '                sqlComm.CommandText = "UIDESK_TrxUploadOutboundWaris_ExecuteTransaksi"
        '                sqlComm.CommandType = CommandType.StoredProcedure
        '                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
        '                sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
        '                sqlComm.Parameters.AddWithValue("call_nama_ahli_waris", call_nama_ahli_waris)
        '                sqlComm.Parameters.AddWithValue("call_username", call_username)
        '                con.Open()
        '                sqlComm.ExecuteNonQuery()
        '            End Using
        '        Catch ex As Exception
        '            strExec = "exec UIDESK_TrxUploadOutboundWaris_ExecuteTransaksi '" & call_upload_id & "','" & call_polis_number & "','" & call_nama_ahli_waris & "','" & call_username & "'"
        '            LogError(strLogTime, ex, strExec)
        '        Finally
        '            strExec = "exec UIDESK_TrxUploadOutboundWaris_ExecuteTransaksi '" & call_upload_id & "','" & call_polis_number & "','" & call_nama_ahli_waris & "','" & call_username & "'"
        '            LogSuccess(strLogTime, strExec)
        '        End Try
        '        'End If
        '    End While
        'Catch __unusedException1__ As Exception
        'Finally
        '    'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        'End Try
        'Dim _streXecute As String = String.Empty
        'Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        'Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        'Try
        '    Using con As New SqlConnection(constring)
        '        Dim sqlComm As New SqlCommand()
        '        sqlComm.Connection = con
        '        sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_ExecuteSummary"
        '        sqlComm.CommandType = CommandType.StoredProcedure
        '        sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
        '        sqlComm.Parameters.AddWithValue("call_username", call_username)
        '        sqlComm.Parameters.AddWithValue("call_upload_type", "waris")
        '        sqlComm.Parameters.AddWithValue("call_summary", "0")
        '        con.Open()
        '        sqlComm.ExecuteNonQuery()
        '        con.Close()
        '    End Using
        'Catch ex As Exception
        '    Dim objectTickets As resultInsert = New resultInsert()
        '    objectTickets.Result = "False"
        '    listTransaksi.Add(objectTickets)
        '    _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & call_username & "','waris'"
        '    LogError(strLogTime, ex, _streXecute)
        'Finally
        '    Dim objectTickets As resultInsert = New resultInsert()
        '    listTransaksi.Add(objectTickets)
        '    _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & call_username & "','waris'"
        '    LogSuccess(strLogTime, _streXecute)
        'End Try

        Return Response
    End Function
    <WebMethod>
    Public Function UploadDataRider() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/FileUploadOutbound/FileRider/")
        Dim call_username As String = HttpContext.Current.Request.Form("Username")
        Dim call_upload_id As String = HttpContext.Current.Request.Form("UploadID").Replace("..", "")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileId As Guid
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
                    Dim FilePath As String = "/FileUploadOutbound/FileRider/"
                    File.SaveAs(Path.Combine(SavePath, call_upload_id & ".xlsx"))
                Else
                End If
            Next
        Next
        Response.Guid = FileId
        Response.FileName = FileName
        Response.FileExt = FileExt
        'SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; 
        'HDR=NO; IMEX=1; Database=\\ptmkpwa12dev08.pertamina.com\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx', 'SELECT * FROM [Sheet1$]')

        '''Coba new
        'Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        'Dim call_polis_number, call_manfaat As String

        'Try
        '    Dim path As String = HttpContext.Current.Server.MapPath("~/FileUploadOutbound/FileRider/" & String.Concat(FileId, FileExt))
        '    'Dim pathNya As String = "E:\#2020\RND\Helpdesk_Wagent\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx"
        '    Dim excelCS As String = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Database={0};Extended Properties=Excel 12.0;HDR=NO; IMEX=1;", path)

        '    'Dim sqlImport As String = "SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; " &
        '    '                           "HDR=NO; IMEX=1; Database=E:\#2020\RND\Helpdesk_Wagent\UploadFile\" & String.Concat(FileId) & ".xlsx', 'SELECT *,''" & String.Concat(FileId) & "'' as IDupload FROM [Sheet1$]')"
        '    Dim sqlImport As String = "exec UIDESK_TrxUploadOutboundRider_SelectExcel '" & String.Concat(FileId) & "'"
        '    Dim cmd As SqlCommand = New SqlCommand(sqlImport, sqlconManual)
        '    cmd.CommandType = CommandType.Text

        '    sqlconManual.Open()
        '    Dim rdr As SqlDataReader = cmd.ExecuteReader()
        '    Dim strExec As String = String.Empty
        '    Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        '    While rdr.Read()
        '        'If insertTable("bulkDataUpload", "nopek, Nama, Realisasi, IDupload, SourceTest,DateRealisasi", "" & rdr("F1").ToString & "," & rdr("F2").ToString & "," & rdr("F3").ToString & "," & rdr("IDupload").ToString & "," & rdr("F4").ToString & "," & rdr("F5").ToString & "") = True Then
        '        call_polis_number = rdr("F1").ToString
        '        call_manfaat = rdr("F2").ToString

        '        Try
        '            Using con As New SqlConnection(constr)
        '                Dim sqlComm As New SqlCommand()
        '                sqlComm.Connection = con
        '                sqlComm.CommandText = "UIDESK_TrxUploadOutboundRider_ExecuteTransaksi"
        '                sqlComm.CommandType = CommandType.StoredProcedure
        '                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
        '                sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
        '                sqlComm.Parameters.AddWithValue("call_manfaat", call_manfaat)
        '                sqlComm.Parameters.AddWithValue("call_username", call_username)
        '                con.Open()
        '                sqlComm.ExecuteNonQuery()
        '            End Using
        '        Catch ex As Exception
        '            strExec = "exec UIDESK_TrxUploadOutboundRider_ExecuteTransaksi '" & call_upload_id & "','" & call_polis_number & "','" & call_manfaat & "','" & call_username & "'"
        '            LogError(strLogTime, ex, strExec)
        '        Finally
        '            strExec = "exec UIDESK_TrxUploadOutboundRider_ExecuteTransaksi '" & call_upload_id & "','" & call_polis_number & "','" & call_manfaat & "','" & call_username & "'"
        '            LogSuccess(strLogTime, strExec)
        '        End Try

        '    End While
        'Catch __unusedException1__ As Exception
        'Finally
        '    'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        'End Try

        'Dim _streXecute As String = String.Empty
        'Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        'Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        'Try
        '    Using con As New SqlConnection(constring)
        '        Dim sqlComm As New SqlCommand()
        '        sqlComm.Connection = con
        '        sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_ExecuteSummary"
        '        sqlComm.CommandType = CommandType.StoredProcedure
        '        sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
        '        sqlComm.Parameters.AddWithValue("call_username", call_username)
        '        sqlComm.Parameters.AddWithValue("call_upload_type", "rider")
        '        sqlComm.Parameters.AddWithValue("call_summary", "0")
        '        con.Open()
        '        sqlComm.ExecuteNonQuery()
        '        con.Close()
        '    End Using
        'Catch ex As Exception
        '    Dim objectTickets As resultInsert = New resultInsert()
        '    objectTickets.Result = "False"
        '    listTransaksi.Add(objectTickets)
        '    _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & call_username & "','rider'"
        '    LogError(strLogTime, ex, _streXecute)
        'Finally
        '    Dim objectTickets As resultInsert = New resultInsert()
        '    listTransaksi.Add(objectTickets)
        '    _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & call_username & "','rider'"
        '    LogSuccess(strLogTime, _streXecute)
        'End Try

        Return Response
    End Function
    <WebMethod>
    Public Function UploadDataFund() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/FileUploadOutbound/FileFund/")
        Dim call_username As String = HttpContext.Current.Request.Form("Username")
        Dim call_upload_id As String = HttpContext.Current.Request.Form("UploadID").Replace("..", "")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileId As Guid
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
                    Dim FilePath As String = "/FileUploadOutbound/FileFund/"
                    File.SaveAs(Path.Combine(SavePath, call_upload_id & ".xlsx"))
                Else
                End If
            Next
        Next
        Response.Guid = FileId
        Response.FileName = FileName
        Response.FileExt = FileExt
        'SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; 
        'HDR=NO; IMEX=1; Database=\\ptmkpwa12dev08.pertamina.com\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx', 'SELECT * FROM [Sheet1$]')

        ''Coba new
        'Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        'Dim call_polis_number, call_jenis_investasi, call_persentase_alokasi As String

        'Try
        '    Dim path As String = HttpContext.Current.Server.MapPath("~/FileUploadOutbound/FileFund/" & String.Concat(FileId, FileExt))
        '    'Dim pathNya As String = "E:\#2020\RND\Helpdesk_Wagent\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx"
        '    Dim excelCS As String = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Database={0};Extended Properties=Excel 12.0;HDR=NO; IMEX=1;", path)

        '    'Dim sqlImport As String = "SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; " &
        '    '                           "HDR=NO; IMEX=1; Database=E:\#2020\RND\Helpdesk_Wagent\UploadFile\" & String.Concat(FileId) & ".xlsx', 'SELECT *,''" & String.Concat(FileId) & "'' as IDupload FROM [Sheet1$]')"
        '    Dim sqlImport As String = "exec UIDESK_TrxUploadOutboundFund_SelectExcel '" & String.Concat(FileId) & "'"
        '    Dim cmd As SqlCommand = New SqlCommand(sqlImport, sqlconManual)
        '    cmd.CommandType = CommandType.Text

        '    sqlconManual.Open()
        '    Dim rdr As SqlDataReader = cmd.ExecuteReader()
        '    Dim strExec As String = String.Empty
        '    Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        '    While rdr.Read()
        '        'If insertTable("bulkDataUpload", "nopek, Nama, Realisasi, IDupload, SourceTest,DateRealisasi", "" & rdr("F1").ToString & "," & rdr("F2").ToString & "," & rdr("F3").ToString & "," & rdr("IDupload").ToString & "," & rdr("F4").ToString & "," & rdr("F5").ToString & "") = True Then
        '        call_polis_number = rdr("F1").ToString
        '        call_jenis_investasi = rdr("F2").ToString
        '        call_persentase_alokasi = rdr("F3").ToString

        '        Try
        '            Using con As New SqlConnection(constr)
        '                Dim sqlComm As New SqlCommand()
        '                sqlComm.Connection = con
        '                sqlComm.CommandText = "UIDESK_TrxUploadOutboundFund_ExecuteTransaksi"
        '                sqlComm.CommandType = CommandType.StoredProcedure
        '                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
        '                sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
        '                sqlComm.Parameters.AddWithValue("call_jenis_investasi", call_jenis_investasi)
        '                sqlComm.Parameters.AddWithValue("call_persentase_alokasi", call_persentase_alokasi)
        '                sqlComm.Parameters.AddWithValue("call_username", call_username)
        '                con.Open()
        '                sqlComm.ExecuteNonQuery()
        '            End Using
        '        Catch ex As Exception
        '            strExec = "exec UIDESK_TrxUploadOutboundFund_ExecuteTransaksi '" & call_upload_id & "','" & call_polis_number & "','" & call_jenis_investasi & "','" & call_persentase_alokasi & "','" & call_username & "'"
        '            LogError(strLogTime, ex, strExec)
        '        Finally
        '            strExec = "exec UIDESK_TrxUploadOutboundFund_ExecuteTransaksi '" & call_upload_id & "','" & call_polis_number & "','" & call_jenis_investasi & "','" & call_persentase_alokasi & "','" & call_username & "'"
        '            LogSuccess(strLogTime, strExec)
        '        End Try

        '    End While
        'Catch __unusedException1__ As Exception
        'Finally
        '    'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        'End Try

        'Dim _streXecute As String = String.Empty
        'Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        'Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        'Try
        '    Using con As New SqlConnection(constring)
        '        Dim sqlComm As New SqlCommand()
        '        sqlComm.Connection = con
        '        sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_ExecuteSummary"
        '        sqlComm.CommandType = CommandType.StoredProcedure
        '        sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
        '        sqlComm.Parameters.AddWithValue("call_username", call_username)
        '        sqlComm.Parameters.AddWithValue("call_upload_type", "fund")
        '        sqlComm.Parameters.AddWithValue("call_summary", "0")
        '        con.Open()
        '        sqlComm.ExecuteNonQuery()
        '        con.Close()
        '    End Using
        'Catch ex As Exception
        '    Dim objectTickets As resultInsert = New resultInsert()
        '    objectTickets.Result = "False"
        '    listTransaksi.Add(objectTickets)
        '    _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & call_username & "','fund'"
        '    LogError(strLogTime, ex, _streXecute)
        'Finally
        '    Dim objectTickets As resultInsert = New resultInsert()
        '    listTransaksi.Add(objectTickets)
        '    _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & call_username & "','fund'"
        '    LogSuccess(strLogTime, _streXecute)
        'End Try
        Return Response
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteSummary(ByVal SummaryID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_DeleteSummary"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxSummaryID", SummaryID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUploadOutboundCall_DeleteSummary '" & SummaryID & "','" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUploadOutboundCall_DeleteSummary '" & SummaryID & "','" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function API_InsertHeader(ByVal call_name As String, ByVal call_email As String, ByVal call_polis_number As String,
                                     ByVal call_phone_number As String, ByVal call_nama_product As String,
                                     ByVal call_flaging_nasabah As String, ByVal call_product_id As String,
                                     ByVal call_username As String, ByVal call_upload_id As String) As String
        '(ByVal call_name As String, ByVal call_email As String, ByVal call_polis_number As String, ByVal call_phone_number As String,
        'ByVal call_nama_product As String,
        'ByVal call_nama_tertanggung As String, ByVal call_uang_pertanggungan As String,
        'ByVal call_premi_dasar_berkala As String, ByVal call_premi_topup As String, ByVal call_cara_bayar As String, ByVal call_tanggal_debet As String,
        'ByVal call_nama_tenaga_penjualan As String, ByVal call_biaya_akuisisi_1 As String, ByVal call_biaya_akuisisi_2 As String, ByVal call_nominal_COI As String,
        'ByVal call_nominal_COR As String, ByVal call_jenis_kelamin As String,
        'ByVal call_flaging_nasabah As String, ByVal call_product_id As String,
        'ByVal call_username As String, ByVal call_upload_id As String) As String
        Dim _streXecute As String = String.Empty
        Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constring)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxOutbound_API_InsertHeader"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_name", call_name)
                sqlComm.Parameters.AddWithValue("call_email", call_email)
                sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
                sqlComm.Parameters.AddWithValue("call_phone_number", call_phone_number)
                sqlComm.Parameters.AddWithValue("call_nama_product", call_nama_product)
                'sqlComm.Parameters.AddWithValue("call_nama_tertanggung", call_nama_tertanggung)
                'sqlComm.Parameters.AddWithValue("call_uang_pertanggungan", call_uang_pertanggungan)
                'sqlComm.Parameters.AddWithValue("call_premi_dasar_berkala", call_premi_dasar_berkala)
                'sqlComm.Parameters.AddWithValue("call_premi_topup", call_premi_topup)
                'sqlComm.Parameters.AddWithValue("call_cara_bayar", call_cara_bayar)
                'sqlComm.Parameters.AddWithValue("call_tanggal_debet", call_tanggal_debet)
                'sqlComm.Parameters.AddWithValue("call_nama_tenaga_penjualan", call_nama_tenaga_penjualan)
                'sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_1", call_biaya_akuisisi_1)
                'sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_2", call_biaya_akuisisi_2)
                'sqlComm.Parameters.AddWithValue("call_nominal_COI", call_nominal_COI)
                'sqlComm.Parameters.AddWithValue("call_nominal_COR", call_nominal_COR)
                'sqlComm.Parameters.AddWithValue("call_jenis_kelamin", call_jenis_kelamin)
                sqlComm.Parameters.AddWithValue("call_flaging_nasabah", call_flaging_nasabah)
                sqlComm.Parameters.AddWithValue("call_product_id", call_product_id)
                sqlComm.Parameters.AddWithValue("call_username", call_username)
                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTransaksi.Add(objectTickets)
            '_streXecute = "exec UIDESK_TrxOutbound_API_InsertHeader '" & call_name & "','" & call_email & "','" & call_polis_number & "','" & call_phone_number & "','" & call_nama_product & "','" & call_nama_tertanggung & "','" & call_uang_pertanggungan & "'" &
            '                  "'" & call_premi_dasar_berkala & "','" & call_premi_topup & "','" & call_cara_bayar & "','" & call_tanggal_debet & "','" & call_nama_tenaga_penjualan & "','" & call_biaya_akuisisi_1 & "','" & call_biaya_akuisisi_2 & "'" &
            '                  "'" & call_nominal_COI & "','" & call_nominal_COR & "','" & call_jenis_kelamin & "','" & call_flaging_nasabah & "','" & call_product_id & "','" & call_username & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, _streXecute)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            listTransaksi.Add(objectTickets)
            '_streXecute = "exec UIDESK_TrxOutbound_API_InsertHeader '" & call_name & "','" & call_email & "','" & call_polis_number & "','" & call_phone_number & "','" & call_nama_product & "','" & call_nama_tertanggung & "','" & call_uang_pertanggungan & "'" &
            '                  "'" & call_premi_dasar_berkala & "','" & call_premi_topup & "','" & call_cara_bayar & "','" & call_tanggal_debet & "','" & call_nama_tenaga_penjualan & "','" & call_biaya_akuisisi_1 & "','" & call_biaya_akuisisi_2 & "'" &
            '                  "'" & call_nominal_COI & "','" & call_nominal_COR & "','" & call_jenis_kelamin & "','" & call_flaging_nasabah & "','" & call_product_id & "','" & call_username & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), _streXecute)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTransaksi)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function API_InsertWaris(ByVal call_upload_id As String, ByVal call_polis_number As String, ByVal call_nama_ahli_waris As String, ByVal call_username As String) As String
        Dim _streXecute As String = String.Empty
        Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constring)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxOutbound_API_InsertWaris"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
                sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
                sqlComm.Parameters.AddWithValue("call_nama_ahli_waris", call_nama_ahli_waris)
                sqlComm.Parameters.AddWithValue("call_username", call_username)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertWaris '" & call_upload_id & "','" & call_polis_number & "','" & call_nama_ahli_waris & "','" & call_username & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, _streXecute)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertWaris '" & call_upload_id & "','" & call_polis_number & "','" & call_nama_ahli_waris & "','" & call_username & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), _streXecute)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTransaksi)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function API_InsertRider(ByVal call_upload_id As String, ByVal call_polis_number_rider As String, ByVal call_manfaat As String, ByVal call_username As String) As String
        Dim _streXecute As String = String.Empty
        Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constring)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxOutbound_API_InsertRider"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
                sqlComm.Parameters.AddWithValue("call_polis_number_rider", call_polis_number_rider)
                sqlComm.Parameters.AddWithValue("call_manfaat", call_manfaat)
                sqlComm.Parameters.AddWithValue("call_username", call_username)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertRider '" & call_upload_id & "','" & call_polis_number_rider & "','" & call_manfaat & "','" & call_username & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, _streXecute)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertRider '" & call_upload_id & "','" & call_polis_number_rider & "','" & call_manfaat & "','" & call_username & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), _streXecute)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTransaksi)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function API_InsertFund(ByVal call_upload_id As String, ByVal call_polis_number As String, ByVal call_jenis_investasi As String, ByVal call_username As String) As String
        Dim _streXecute As String = String.Empty
        Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constring)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxOutbound_API_InsertFund"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
                sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
                sqlComm.Parameters.AddWithValue("call_jenis_investasi", call_jenis_investasi)
                sqlComm.Parameters.AddWithValue("call_username", call_username)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertFund '" & call_upload_id & "','" & call_polis_number & "','" & call_jenis_investasi & "','" & call_username & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, _streXecute)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertFund '" & call_upload_id & "','" & call_jenis_investasi & "','" & call_username & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), _streXecute)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTransaksi)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function API_HeaderSummary(ByVal call_upload_id As String, ByVal call_username As String, ByVal call_type As String, ByVal call_summary As String) As String
        Dim _strHeader As String = String.Empty
        Dim _listHeader As List(Of resultInsert) = New List(Of resultInsert)()
        Dim _Result As String = String.Empty
        Dim constringHeader As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constringHeader)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_ExecuteSummary"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
                sqlComm.Parameters.AddWithValue("call_username", call_username)
                sqlComm.Parameters.AddWithValue("call_upload_type", call_type)
                sqlComm.Parameters.AddWithValue("call_summary", call_summary)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("call_upload_rows").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = _Result
            _listHeader.Add(objectTickets)
            _strHeader = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & call_username & "','Polis','" & call_summary & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, _strHeader)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = _Result
            _listHeader.Add(objectTickets)
            _strHeader = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & call_username & "','Polis','" & call_summary & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), _strHeader)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(_listHeader)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteTableAPI(ByVal ApiID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_DeleteTableAPI"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxApiID", ApiID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUploadOutboundCall_DeleteSummary '" & ApiID & "','" & UserNameXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUploadOutboundCall_DeleteSummary '" & ApiID & "','" & UserNameXSS & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Upload_InsertHeader(ByVal TrxUploadID As String, ByVal ProductCampaignID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        Dim call_name, call_email, call_polis_number, call_phone_number, call_nama_product, call_nama_tertanggung As String
        Dim call_uang_pertanggungan, call_premi_dasar_berkala, call_premi_topup, call_cara_bayar As String
        Dim call_tanggal_debet, call_nama_tenaga_penjualan, call_biaya_akuisisi_1_add, call_biaya_akuisisi_2_add, call_biaya_akuisisi_3_add,
            call_biaya_akuisisi_4_add, call_biaya_akuisisi_5_add, call_nominal_COI, call_tanggal_efolis, call_tanggal_transaction As String
        Dim call_nominal_COR, call_jenis_kelamin, call_flaging_nasabah, call_nomor_rekening, call_virtual_account As String
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            'Dim path As String = HttpContext.Current.Server.MapPath("~/FileUploadOutbound/FileNasabah/" & TrxUploadID & ".xlsx")
            ''Dim pathNya As String = "E:\#2020\RND\Helpdesk_Wagent\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx"
            'Dim excelCS As String = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Database={0};Extended Properties=Excel 12.0;HDR=NO; IMEX=1;", path)
            Dim sqlImport As String = "exec UIDESK_TrxUploadOutboundCall_SelectExcel '" & TrxUploadID & "'"
            Dim cmd As SqlCommand = New SqlCommand(sqlImport, sqlconManual)
            cmd.CommandType = CommandType.Text

            sqlconManual.Open()
            Dim rdr As SqlDataReader = cmd.ExecuteReader()
            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            While rdr.Read()
                'If insertTable("bulkDataUpload", "nopek, Nama, Realisasi, IDupload, SourceTest,DateRealisasi", "" & rdr("F1").ToString & "," & rdr("F2").ToString & "," & rdr("F3").ToString & "," & rdr("IDupload").ToString & "," & rdr("F4").ToString & "," & rdr("F5").ToString & "") = True Then
                call_name = rdr("F1").ToString
                call_jenis_kelamin = rdr("F2").ToString
                call_nama_product = rdr("F3").ToString
                call_polis_number = rdr("F4").ToString
                call_nama_tertanggung = rdr("F5").ToString
                call_uang_pertanggungan = rdr("F6").ToString
                call_premi_dasar_berkala = rdr("F7").ToString
                call_premi_topup = rdr("F8").ToString
                call_cara_bayar = rdr("F9").ToString
                call_tanggal_debet = rdr("F10").ToString
                call_nama_tenaga_penjualan = rdr("F11").ToString
                call_nomor_rekening = rdr("F12").ToString
                call_virtual_account = rdr("F13").ToString
                call_tanggal_efolis = rdr("F14").ToString
                call_tanggal_transaction = rdr("F15").ToString
                call_phone_number = rdr("F16").ToString
                call_email = rdr("F17").ToString
                call_flaging_nasabah = rdr("F18").ToString
                call_biaya_akuisisi_1_add = rdr("F19").ToString
                call_biaya_akuisisi_2_add = rdr("F20").ToString
                call_biaya_akuisisi_3_add = rdr("F21").ToString
                call_biaya_akuisisi_4_add = rdr("F22").ToString
                call_biaya_akuisisi_5_add = rdr("F23").ToString
                'call_nama_ahli_waris = rdr("F7").ToString
                'call_manfaat_tambahan_rider = rdr("F9").ToString
                'call_jenis_darlink = rdr("F19").ToString

                Try
                    Using con As New SqlConnection(constr)
                        Dim sqlComm As New SqlCommand()
                        sqlComm.Connection = con
                        sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_ExecuteTransaksi"
                        sqlComm.CommandType = CommandType.StoredProcedure
                        sqlComm.Parameters.AddWithValue("call_name", call_name)
                        sqlComm.Parameters.AddWithValue("call_email", call_email)
                        sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
                        sqlComm.Parameters.AddWithValue("call_phone_number", call_phone_number)
                        sqlComm.Parameters.AddWithValue("call_nama_product", call_nama_product)
                        sqlComm.Parameters.AddWithValue("call_nama_tertanggung", call_nama_tertanggung)
                        sqlComm.Parameters.AddWithValue("call_uang_pertanggungan", call_uang_pertanggungan)
                        sqlComm.Parameters.AddWithValue("call_premi_dasar_berkala", call_premi_dasar_berkala)
                        sqlComm.Parameters.AddWithValue("call_premi_topup", call_premi_topup)
                        sqlComm.Parameters.AddWithValue("call_cara_bayar", call_cara_bayar)
                        sqlComm.Parameters.AddWithValue("call_tanggal_debet", call_tanggal_debet)
                        sqlComm.Parameters.AddWithValue("call_nama_tenaga_penjualan", call_nama_tenaga_penjualan)
                        sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_1", call_nomor_rekening)
                        sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_2", call_virtual_account)
                        sqlComm.Parameters.AddWithValue("call_nominal_COI", call_tanggal_efolis)
                        sqlComm.Parameters.AddWithValue("call_nominal_COR", call_tanggal_transaction)
                        sqlComm.Parameters.AddWithValue("call_jenis_kelamin", call_jenis_kelamin)
                        sqlComm.Parameters.AddWithValue("call_flaging_nasabah", call_flaging_nasabah)
                        sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_1_add", call_biaya_akuisisi_1_add)
                        sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_2_add", call_biaya_akuisisi_2_add)
                        sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_3_add", call_biaya_akuisisi_3_add)
                        sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_4_add", call_biaya_akuisisi_4_add)
                        sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_5_add", call_biaya_akuisisi_5_add)
                        sqlComm.Parameters.AddWithValue("call_product_id", ProductCampaignID)
                        sqlComm.Parameters.AddWithValue("call_username", UserNameXSS)
                        sqlComm.Parameters.AddWithValue("call_upload_id", TrxUploadID)
                        con.Open()
                        sqlComm.ExecuteNonQuery()
                    End Using
                Catch ex As Exception
                    strExec = "exec UIDESK_TrxUploadOutboundCall_ExecuteTransaksi '" & call_name & "','" & call_email & "','" & call_polis_number & "','" & call_phone_number & "','" & call_nama_product & "','" & call_nama_tertanggung & "','" & call_uang_pertanggungan & "'" &
                              "'" & call_premi_dasar_berkala & "','" & call_premi_topup & "','" & call_cara_bayar & "','" & call_tanggal_debet & "','" & call_nama_tenaga_penjualan & "','" & call_nomor_rekening & "','" & call_virtual_account & "'" &
                              "'" & call_tanggal_efolis & "','" & call_tanggal_transaction & "','" & call_jenis_kelamin & "','" & call_flaging_nasabah & "',
                              '" & call_biaya_akuisisi_1_add & "','" & call_biaya_akuisisi_2_add & "','" & call_biaya_akuisisi_3_add & "','" & call_biaya_akuisisi_4_add & "','" & call_biaya_akuisisi_5_add & "','" & ProductCampaignID & "','" & UserNameXSS & "','" & TrxUploadID & "'"
                    LogError(HttpContext.Current.Session("UserName"), ex, strExec)
                Finally
                    strExec = "exec UIDESK_TrxUploadOutboundCall_ExecuteTransaksi '" & call_name & "','" & call_email & "','" & call_polis_number & "','" & call_phone_number & "','" & call_nama_product & "','" & call_nama_tertanggung & "','" & call_uang_pertanggungan & "'" &
                              "'" & call_premi_dasar_berkala & "','" & call_premi_topup & "','" & call_cara_bayar & "','" & call_tanggal_debet & "','" & call_nama_tenaga_penjualan & "','" & call_nomor_rekening & "','" & call_virtual_account & "'" &
                              "'" & call_tanggal_efolis & "','" & call_tanggal_transaction & "','" & call_jenis_kelamin & "','" & call_flaging_nasabah & "',
                              '" & call_biaya_akuisisi_1_add & "','" & call_biaya_akuisisi_2_add & "','" & call_biaya_akuisisi_3_add & "','" & call_biaya_akuisisi_4_add & "','" & call_biaya_akuisisi_5_add & "','" & ProductCampaignID & "','" & UserNameXSS & "','" & TrxUploadID & "'"
                    LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                End Try
                'End If
            End While
        Catch __unusedException1__ As Exception
        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try

        Dim _streXecute As String = String.Empty
        Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constring)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_ExecuteSummary"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", TrxUploadID)
                sqlComm.Parameters.AddWithValue("call_username", UserNameXSS)
                sqlComm.Parameters.AddWithValue("call_upload_type", "Polis")
                sqlComm.Parameters.AddWithValue("call_summary", "0")
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & UserNameXSS & "','Polis'"
            LogError(HttpContext.Current.Session("UserName"), ex, _streXecute)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & UserNameXSS & "','Polis'"
            LogSuccess(HttpContext.Current.Session("UserName"), _streXecute)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Upload_InsertWaris(ByVal TrxUploadID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        ''Coba new
        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        Dim call_polis_number, call_nama_ahli_waris As String
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            'Dim path As String = HttpContext.Current.Server.MapPath("~/FileUploadOutbound/FileWaris/" & TrxUploadID & ".xlsx")
            ''Dim pathNya As String = "E:\#2020\RND\Helpdesk_Wagent\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx"
            'Dim excelCS As String = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Database={0};Extended Properties=Excel 12.0;HDR=NO; IMEX=1;", path)

            'Dim sqlImport As String = "SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; " &
            '                           "HDR=NO; IMEX=1; Database=E:\#2020\RND\Helpdesk_Wagent\UploadFile\" & String.Concat(FileId) & ".xlsx', 'SELECT *,''" & String.Concat(FileId) & "'' as IDupload FROM [Sheet1$]')"
            Dim sqlImport As String = "exec UIDESK_TrxUploadOutboundWaris_SelectExcel '" & TrxUploadID & "'"
            Dim cmd As SqlCommand = New SqlCommand(sqlImport, sqlconManual)
            cmd.CommandType = CommandType.Text

            sqlconManual.Open()
            Dim rdr As SqlDataReader = cmd.ExecuteReader()
            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            While rdr.Read()
                'If insertTable("bulkDataUpload", "nopek, Nama, Realisasi, IDupload, SourceTest,DateRealisasi", "" & rdr("F1").ToString & "," & rdr("F2").ToString & "," & rdr("F3").ToString & "," & rdr("IDupload").ToString & "," & rdr("F4").ToString & "," & rdr("F5").ToString & "") = True Then
                call_polis_number = rdr("F1").ToString
                call_nama_ahli_waris = rdr("F2").ToString

                Try
                    Using con As New SqlConnection(constr)
                        Dim sqlComm As New SqlCommand()
                        sqlComm.Connection = con
                        sqlComm.CommandText = "UIDESK_TrxUploadOutboundWaris_ExecuteTransaksi"
                        sqlComm.CommandType = CommandType.StoredProcedure
                        sqlComm.Parameters.AddWithValue("call_upload_id", TrxUploadID)
                        sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
                        sqlComm.Parameters.AddWithValue("call_nama_ahli_waris", call_nama_ahli_waris)
                        sqlComm.Parameters.AddWithValue("call_username", UserNameXSS)
                        con.Open()
                        sqlComm.ExecuteNonQuery()
                    End Using
                Catch ex As Exception
                    strExec = "exec UIDESK_TrxUploadOutboundWaris_ExecuteTransaksi '" & TrxUploadID & "','" & call_polis_number & "','" & call_nama_ahli_waris & "','" & UserNameXSS & "'"
                    LogError(strLogTime, ex, strExec)
                Finally
                    strExec = "exec UIDESK_TrxUploadOutboundWaris_ExecuteTransaksi '" & TrxUploadID & "','" & call_polis_number & "','" & call_nama_ahli_waris & "','" & UserNameXSS & "'"
                    LogSuccess(strLogTime, strExec)
                End Try
                'End If
            End While
        Catch __unusedException1__ As Exception
        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try
        Dim _streXecute As String = String.Empty
        Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constring)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_ExecuteSummary"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", TrxUploadID)
                sqlComm.Parameters.AddWithValue("call_username", UserNameXSS)
                sqlComm.Parameters.AddWithValue("call_upload_type", "waris")
                sqlComm.Parameters.AddWithValue("call_summary", "0")
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & UserNameXSS & "','waris'"
            LogError(HttpContext.Current.Session("UserName"), ex, _streXecute)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & UserNameXSS & "','waris'"
            LogSuccess(HttpContext.Current.Session("UserName"), _streXecute)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Upload_InsertRider(ByVal TrxUploadID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()

        ''Coba new
        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        Dim call_polis_number, call_manfaat, call_nominal As String
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)

        Try
            'Dim path As String = HttpContext.Current.Server.MapPath("~/FileUploadOutbound/FileRider/" & TrxUploadID & ".xlsx")
            ''Dim pathNya As String = "E:\#2020\RND\Helpdesk_Wagent\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx"
            'Dim excelCS As String = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Database={0};Extended Properties=Excel 12.0;HDR=NO; IMEX=1;", path)

            'Dim sqlImport As String = "SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; " &
            '                           "HDR=NO; IMEX=1; Database=E:\#2020\RND\Helpdesk_Wagent\UploadFile\" & String.Concat(FileId) & ".xlsx', 'SELECT *,''" & String.Concat(FileId) & "'' as IDupload FROM [Sheet1$]')"
            Dim sqlImport As String = "exec UIDESK_TrxUploadOutboundRider_SelectExcel '" & TrxUploadID & "'" '"
            Dim cmd As SqlCommand = New SqlCommand(sqlImport, sqlconManual)
            cmd.CommandType = CommandType.Text

            sqlconManual.Open()
            Dim rdr As SqlDataReader = cmd.ExecuteReader()
            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            While rdr.Read()
                'If insertTable("bulkDataUpload", "nopek, Nama, Realisasi, IDupload, SourceTest,DateRealisasi", "" & rdr("F1").ToString & "," & rdr("F2").ToString & "," & rdr("F3").ToString & "," & rdr("IDupload").ToString & "," & rdr("F4").ToString & "," & rdr("F5").ToString & "") = True Then
                call_polis_number = rdr("F1").ToString
                call_manfaat = rdr("F2").ToString
                call_nominal = rdr("F3").ToString

                Try
                    Using con As New SqlConnection(constr)
                        Dim sqlComm As New SqlCommand()
                        sqlComm.Connection = con
                        sqlComm.CommandText = "UIDESK_TrxUploadOutboundRider_ExecuteTransaksi"
                        sqlComm.CommandType = CommandType.StoredProcedure
                        sqlComm.Parameters.AddWithValue("call_upload_id", TrxUploadID)
                        sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
                        sqlComm.Parameters.AddWithValue("call_manfaat", call_manfaat)
                        sqlComm.Parameters.AddWithValue("call_nominal", call_nominal)
                        sqlComm.Parameters.AddWithValue("call_username", UserNameXSS)
                        con.Open()
                        sqlComm.ExecuteNonQuery()
                    End Using
                Catch ex As Exception
                    strExec = "exec UIDESK_TrxUploadOutboundRider_ExecuteTransaksi '" & TrxUploadID & "','" & call_polis_number & "','" & call_manfaat & "','" & call_nominal & "','" & UserNameXSS & "'"
                    LogError(HttpContext.Current.Session("UserName"), ex, strExec)
                Finally
                    strExec = "exec UIDESK_TrxUploadOutboundRider_ExecuteTransaksi '" & TrxUploadID & "','" & call_polis_number & "','" & call_manfaat & "','" & call_nominal & "','" & UserNameXSS & "'"
                    LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                End Try

            End While
        Catch __unusedException1__ As Exception
        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try

        Dim _streXecute As String = String.Empty
        Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constring)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_ExecuteSummary"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", TrxUploadID)
                sqlComm.Parameters.AddWithValue("call_username", UserNameXSS)
                sqlComm.Parameters.AddWithValue("call_upload_type", "rider")
                sqlComm.Parameters.AddWithValue("call_summary", "0")
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & UserNameXSS & "','rider'"
            LogError(HttpContext.Current.Session("UserName"), ex, _streXecute)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & UserNameXSS & "','rider'"
            LogSuccess(HttpContext.Current.Session("UserName"), _streXecute)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function Upload_InsertFund(ByVal TrxUploadID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()

        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        Dim call_polis_number, call_jenis_investasi, call_persentase_alokasi As String
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)

        Try
            'Dim path As String = HttpContext.Current.Server.MapPath("~/FileUploadOutbound/FileFund/" & TrxUploadID & ".xlsx")
            ''Dim pathNya As String = "E:\#2020\RND\Helpdesk_Wagent\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx"
            'Dim excelCS As String = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Database={0};Extended Properties=Excel 12.0;HDR=NO; IMEX=1;", path)

            'Dim sqlImport As String = "SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; " &
            '                           "HDR=NO; IMEX=1; Database=E:\#2020\RND\Helpdesk_Wagent\UploadFile\" & String.Concat(FileId) & ".xlsx', 'SELECT *,''" & String.Concat(FileId) & "'' as IDupload FROM [Sheet1$]')"
            Dim sqlImport As String = "exec UIDESK_TrxUploadOutboundFund_SelectExcel '" & TrxUploadID & "'"
            Dim cmd As SqlCommand = New SqlCommand(sqlImport, sqlconManual)
            cmd.CommandType = CommandType.Text

            sqlconManual.Open()
            Dim rdr As SqlDataReader = cmd.ExecuteReader()
            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            While rdr.Read()
                'If insertTable("bulkDataUpload", "nopek, Nama, Realisasi, IDupload, SourceTest,DateRealisasi", "" & rdr("F1").ToString & "," & rdr("F2").ToString & "," & rdr("F3").ToString & "," & rdr("IDupload").ToString & "," & rdr("F4").ToString & "," & rdr("F5").ToString & "") = True Then
                call_polis_number = rdr("F1").ToString
                call_jenis_investasi = rdr("F2").ToString
                call_persentase_alokasi = rdr("F3").ToString

                Try
                    Using con As New SqlConnection(constr)
                        Dim sqlComm As New SqlCommand()
                        sqlComm.Connection = con
                        sqlComm.CommandText = "UIDESK_TrxUploadOutboundFund_ExecuteTransaksi"
                        sqlComm.CommandType = CommandType.StoredProcedure
                        sqlComm.Parameters.AddWithValue("call_upload_id", TrxUploadID)
                        sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
                        sqlComm.Parameters.AddWithValue("call_jenis_investasi", call_jenis_investasi)
                        sqlComm.Parameters.AddWithValue("call_persentase_alokasi", call_persentase_alokasi)
                        sqlComm.Parameters.AddWithValue("call_username", UserNameXSS)
                        con.Open()
                        sqlComm.ExecuteNonQuery()
                    End Using
                Catch ex As Exception
                    strExec = "exec UIDESK_TrxUploadOutboundFund_ExecuteTransaksi '" & TrxUploadID & "','" & call_polis_number & "','" & call_jenis_investasi & "','" & call_persentase_alokasi & "','" & UserNameXSS & "'"
                    LogError(HttpContext.Current.Session("UserName"), ex, strExec)
                Finally
                    strExec = "exec UIDESK_TrxUploadOutboundFund_ExecuteTransaksi '" & TrxUploadID & "','" & call_polis_number & "','" & call_jenis_investasi & "','" & call_persentase_alokasi & "','" & UserNameXSS & "'"
                    LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                End Try

            End While
        Catch __unusedException1__ As Exception
        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try

        Dim _streXecute As String = String.Empty
        Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constring)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_ExecuteSummary"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", TrxUploadID)
                sqlComm.Parameters.AddWithValue("call_username", UserNameXSS)
                sqlComm.Parameters.AddWithValue("call_upload_type", "fund")
                sqlComm.Parameters.AddWithValue("call_summary", "0")
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & TrxUserName & "','fund'"
            LogError(HttpContext.Current.Session("UserName"), ex, _streXecute)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & TrxUserName & "','fund'"
            LogSuccess(HttpContext.Current.Session("UserName"), _streXecute)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function CheckingHeader(ByVal TrxUserName As String) As String
        Dim DateNow As String = DateTime.Now.ToString("yyyy-MM-dd")
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "select * from UIDESK_TrxOutboundHeader where call_created_date between '" & DateNow & " 00:01' And '" & DateNow & " 23:59'"

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
    Public Function CheckingWaris(ByVal TrxUserName As String) As String
        Dim DateNow As String = DateTime.Now.ToString("yyyy-MM-dd")
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "select * from UIDESK_TrxOutbound_NamaAhliWaris where call_date between '" & DateNow & " 00:01' And '" & DateNow & " 23:59'"

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
    Public Function CheckingRider(ByVal TrxUserName As String) As String
        Dim DateNow As String = DateTime.Now.ToString("yyyy-MM-dd")
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "select * from UIDESK_TrxOutbound_Rider where call_date between '" & DateNow & " 00:01' And '" & DateNow & " 23:59'"

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
    Public Function CheckingFund(ByVal TrxUserName As String) As String
        Dim DateNow As String = DateTime.Now.ToString("yyyy-MM-dd")
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "select * from UIDESK_TrxOutbound_Fund where call_date between '" & DateNow & " 00:01' And '" & DateNow & " 23:59'"

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