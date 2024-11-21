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
Imports System.Text
Imports System.Configuration
Imports System.Security.Cryptography
Imports System.Web.Security.AntiXss

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class Uidesk_011
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    'Dim sqlconWA As New SqlConnection(ConfigurationManager.ConnectionStrings("WAConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim Proses As New ClsConn
    Public Class resultInsert
        Public Property Result As String
        Public Property TrxmsgSystem As String
    End Class
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
    Public Function BigConvertDataTabletoString(ByVal dt As DataTable) As String
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
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function APPS_UIDESK_QUERY(ByVal ID As String, ByVal TableID As String, ByVal UserName As String, ByVal Action As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec APPS_UIDESK_QUERY"
        Dim ExecSP = "" & NameSP & " '" & ID & "','" & TableID & "','" & UserName & "','" & Action & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("APPS_UIDESK_QUERY", conn)
                sqlComm.Parameters.AddWithValue("@ID", ID)
                sqlComm.Parameters.AddWithValue("@TableID", TableID)
                sqlComm.Parameters.AddWithValue("@UserName", UserName)
                sqlComm.Parameters.AddWithValue("@Action", Action)
                sqlComm.CommandType = CommandType.StoredProcedure
                Dim da As SqlDataAdapter = New SqlDataAdapter()
                Dim ds As DataSet = New DataSet()
                da.SelectCommand = sqlComm
                da.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, ExecSP)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), ExecSP)
        End Try
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function APPS_UIDESK_TRANSAKSI_PROCESS(ByVal Subject As String, ByVal CompanyID As String, ByVal PartnerID As String, ByVal ApplicationID As String,
                                                  ByVal FollowState As String, ByVal Status As String, ByVal Note As String, ByVal DateTransaksi As String,
                                                  ByVal Uidesk As String, ByVal UserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim TransaksiID As String = DateTime.Now.ToString("ddMMyyyyhhmmss")
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "APPS_UIDESK_TRANSAKSI_PROCESS"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TransaksiID", TransaksiID)
                sqlComm.Parameters.AddWithValue("Subject", Subject)
                sqlComm.Parameters.AddWithValue("CompanyID", CompanyID)
                sqlComm.Parameters.AddWithValue("PartnerID", PartnerID)
                sqlComm.Parameters.AddWithValue("ApplicationID", ApplicationID)
                sqlComm.Parameters.AddWithValue("FollowState", FollowState)
                sqlComm.Parameters.AddWithValue("Status", Status)
                sqlComm.Parameters.AddWithValue("Note", Note)
                sqlComm.Parameters.AddWithValue("DateTransaksi", DateTransaksi)
                sqlComm.Parameters.AddWithValue("Uidesk", Uidesk)
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec APPS_UIDESK_TRANSAKSI_PROCESS '" & TransaksiID & "','" & Subject & "','" & CompanyID & "','" & PartnerID & "','" & ApplicationID & "','" & FollowState & "','" & Status & "','" & Note & "','" & DateTransaksi & "','" & Uidesk & "','" & UserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec APPS_UIDESK_TRANSAKSI_PROCESS '" & TransaksiID & "','" & Subject & "','" & CompanyID & "','" & PartnerID & "','" & ApplicationID & "','" & FollowState & "','" & Status & "','" & Note & "','" & DateTransaksi & "','" & Uidesk & "','" & UserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function APPS_UIDESK_TRANSAKSI_INTERACTION(ByVal TransaksiID As String, ByVal Subject As String, ByVal FollowState As String,
                                                  ByVal Note As String, ByVal StatusTransaksi As String, ByVal UserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "APPS_UIDESK_TRANSAKSI_INTERACTION"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TransaksiID", TransaksiID)
                sqlComm.Parameters.AddWithValue("Subject", Subject)
                sqlComm.Parameters.AddWithValue("Note", Note)
                sqlComm.Parameters.AddWithValue("FollowState", FollowState)
                sqlComm.Parameters.AddWithValue("StatusTransaksi", StatusTransaksi)
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec APPS_UIDESK_TRANSAKSI_INTERACTION '" & TransaksiID & "','" & Subject & "','" & Note & "','" & FollowState & "','" & StatusTransaksi & "','" & UserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec APPS_UIDESK_TRANSAKSI_INTERACTION '" & TransaksiID & "','" & Subject & "','" & Note & "','" & FollowState & "','" & StatusTransaksi & "','" & UserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function APPS_UIDESK_TRANSAKSI_QUOTATION(ByVal TransaksiID As String, ByVal Subject As String, ByVal Number As String,
                                                  ByVal Note As String, ByVal Versi As String, ByVal Total As String, ByVal UserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "APPS_UIDESK_TRANSAKSI_QUOTATION"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TransaksiID", TransaksiID)
                sqlComm.Parameters.AddWithValue("Subject", Subject)
                sqlComm.Parameters.AddWithValue("Number", Number)
                sqlComm.Parameters.AddWithValue("Note", Note)
                sqlComm.Parameters.AddWithValue("Versi", Versi)
                sqlComm.Parameters.AddWithValue("Total", Total)
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec APPS_UIDESK_TRANSAKSI_QUOTATION '" & TransaksiID & "','" & Subject & "','" & Number & "','" & Note & "','" & Versi & "','" & Total & "','" & UserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec APPS_UIDESK_TRANSAKSI_QUOTATION '" & TransaksiID & "','" & Subject & "','" & Number & "','" & Note & "','" & Versi & "','" & Total & "','" & UserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function APPS_UIDESK_MASTER_001(ByVal TransaksiID As String, ByVal Company As String,
                                           ByVal PIC As String, ByVal PICHP As String, ByVal PICMail As String,
                                           ByVal Status As String, ByVal UserName As String, ByVal Action As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim TabelID As String = String.Empty
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "APPS_UIDESK_MASTER_001"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TransaksiID", TransaksiID)
                sqlComm.Parameters.AddWithValue("Company", Company)
                sqlComm.Parameters.AddWithValue("PIC", PIC)
                sqlComm.Parameters.AddWithValue("PICHP", PICHP)
                sqlComm.Parameters.AddWithValue("PICMail", PICMail)
                sqlComm.Parameters.AddWithValue("Status", Status)
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                sqlComm.Parameters.AddWithValue("Action", Action)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec APPS_UIDESK_MASTER_001 '" & TransaksiID & "','" & Company & "','" & PIC & "','" & PICHP & "','" & PICMail & "','" & Status & "','" & UserName & "','" & Action & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec APPS_UIDESK_MASTER_001 '" & TransaksiID & "','" & Company & "','" & PIC & "','" & PICHP & "','" & PICMail & "','" & Status & "','" & UserName & "','" & Action & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function APPS_UIDESK_MASTER_002(ByVal TransaksiID As String, ByVal PartnerName As String,
                               ByVal PartnerCompany As String, ByVal PartnerContactHP As String, ByVal PartnerContactMail As String,
                               ByVal Status As String, ByVal UserName As String, ByVal Action As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim TabelID As String = String.Empty
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "APPS_UIDESK_MASTER_002"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TransaksiID", TransaksiID)
                sqlComm.Parameters.AddWithValue("PartnerName", PartnerName)
                sqlComm.Parameters.AddWithValue("PartnerCompany", PartnerCompany)
                sqlComm.Parameters.AddWithValue("PartnerContactHP", PartnerContactHP)
                sqlComm.Parameters.AddWithValue("PartnerContactMail", PartnerContactMail)
                sqlComm.Parameters.AddWithValue("Status", Status)
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                sqlComm.Parameters.AddWithValue("Action", Action)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec APPS_UIDESK_MASTER_002 '" & TransaksiID & "','" & PartnerName & "','" & PartnerCompany & "','" & PartnerContactHP & "','" & PartnerContactMail & "','" & Status & "','" & UserName & "','" & Action & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec APPS_UIDESK_MASTER_002 '" & TransaksiID & "','" & PartnerName & "','" & PartnerCompany & "','" & PartnerContactHP & "','" & PartnerContactMail & "','" & Status & "','" & UserName & "','" & Action & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function APPS_UIDESK_MASTER_003(ByVal TransaksiID As String, ByVal Application As String, ByVal Status As String,
                                           ByVal UserName As String, ByVal Action As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim TabelID As String = String.Empty
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "APPS_UIDESK_MASTER_003"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TransaksiID", TransaksiID)
                sqlComm.Parameters.AddWithValue("Application", Application)
                sqlComm.Parameters.AddWithValue("Status", Status)
                sqlComm.Parameters.AddWithValue("UserName", UserName)
                sqlComm.Parameters.AddWithValue("Action", Action)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec APPS_UIDESK_MASTER_003 '" & TransaksiID & "','" & Application & "','" & Status & "','" & UserName & "','" & Action & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec APPS_UIDESK_MASTER_003 '" & TransaksiID & "','" & Application & "','" & Status & "','" & UserName & "','" & Action & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    Public Function FileTransaksi() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/apps/FileUIDESK/FileTransaksi/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/")
        Dim UserCreate As String = HttpContext.Current.Request.Form("UserName")
        Dim TransaksiID As String = HttpContext.Current.Request.Form("TransaksiID")
        'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileSizing As String = String.Empty
        Dim FileId As Guid

        Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/FileUIDESK/FileTransaksi/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "")))
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
                    Dim FilePath As String = "apps/FileUIDESK/FileTransaksi/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/"
                    If FileSize > 2 Then
                        Response.Guid = FileId
                        Response.FileName = FileName
                        Response.FileExt = FileExt
                        Response.FileSizing = FileSizing
                        Response.ResultUpload = "Please upload file less than 2 MB. Thanks!"
                    Else
                        File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
                    End If
                    'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))
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
        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)

        Try
            Dim path As String = HttpContext.Current.Server.MapPath("~/apps/FileUIDESK/FileTransaksi/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/" & String.Concat(FileId, FileExt))
            Dim TrxUrl As String = "FileUIDESK/FileTransaksi/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/" & String.Concat(FileId, FileExt)

            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "APPS_UIDESK_TRANSAKSI_ATTACHMENT_SP"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TransaksiID", TransaksiID)
                    sqlComm.Parameters.AddWithValue("URL", TrxUrl)
                    sqlComm.Parameters.AddWithValue("FolderName", strLogTime)
                    sqlComm.Parameters.AddWithValue("FileName", HttpUtility.UrlDecode(FileName))
                    sqlComm.Parameters.AddWithValue("Extension", FileExt)
                    sqlComm.Parameters.AddWithValue("Size", FileSizing)
                    sqlComm.Parameters.AddWithValue("UserName", UserCreate)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Catch ex As Exception

                strExec = "exec APPS_UIDESK_TRANSAKSI_ATTACHMENT_SP '" & TransaksiID & "','" & TrxUrl & "','" & strLogTime & "','" & HttpUtility.UrlDecode(FileName) & "','" & FileExt & "','" & FileSizing & "','" & UserCreate & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally

                strExec = "exec APPS_UIDESK_TRANSAKSI_ATTACHMENT_SP '" & TransaksiID & "','" & TrxUrl & "','" & strLogTime & "','" & HttpUtility.UrlDecode(FileName) & "','" & FileExt & "','" & FileSizing & "','" & UserCreate & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                ''End
            End Try

        Catch __unusedException1__ As Exception
        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try
        Return Response
    End Function
    <WebMethod(EnableSession:=True)>
    Public Function FileInteraction() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/apps/FileUIDESK/FileInteraksi/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/")
        Dim UserCreate As String = HttpContext.Current.Request.Form("UserName")
        Dim TransaksiID As String = HttpContext.Current.Request.Form("TransaksiID")
        'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileSizing As String = String.Empty
        Dim FileId As Guid

        Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/FileUIDESK/FileInteraksi/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "")))
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
                    Dim FilePath As String = "apps/FileUIDESK/FileInteraksi/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/"
                    If FileSize > 2 Then
                        Response.Guid = FileId
                        Response.FileName = FileName
                        Response.FileExt = FileExt
                        Response.FileSizing = FileSizing
                        Response.ResultUpload = "Please upload file less than 2 MB. Thanks!"
                    Else
                        File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
                    End If
                    'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))
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
        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)

        Try
            Dim path As String = HttpContext.Current.Server.MapPath("~/apps/FileUIDESK/FileInteraksi/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/" & String.Concat(FileId, FileExt))
            Dim TrxUrl As String = "FileUIDESK/FileInteraksi/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/" & String.Concat(FileId, FileExt)

            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "APPS_UIDESK_INTERACTION_ATTACHMENT_SP"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TransaksiID", TransaksiID)
                    sqlComm.Parameters.AddWithValue("InteractionID", "0")
                    sqlComm.Parameters.AddWithValue("URL", TrxUrl)
                    sqlComm.Parameters.AddWithValue("FolderName", strLogTime)
                    sqlComm.Parameters.AddWithValue("FileName", HttpUtility.UrlDecode(FileName))
                    sqlComm.Parameters.AddWithValue("Extension", FileExt)
                    sqlComm.Parameters.AddWithValue("Size", FileSizing)
                    sqlComm.Parameters.AddWithValue("UserName", UserCreate)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Catch ex As Exception

                strExec = "exec APPS_UIDESK_INTERACTION_ATTACHMENT_SP '" & TransaksiID & "','0','" & TrxUrl & "','" & strLogTime & "','" & HttpUtility.UrlDecode(FileName) & "','" & FileExt & "','" & FileSizing & "','" & UserCreate & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally

                strExec = "exec APPS_UIDESK_INTERACTION_ATTACHMENT_SP '" & TransaksiID & "','0','" & TrxUrl & "','" & strLogTime & "','" & HttpUtility.UrlDecode(FileName) & "','" & FileExt & "','" & FileSizing & "','" & UserCreate & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                ''End
            End Try

        Catch __unusedException1__ As Exception
        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try
        Return Response
    End Function
    <WebMethod(EnableSession:=True)>
    Public Function FileQuotation() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/apps/FileUIDESK/FileQuotation/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/")
        Dim UserCreate As String = HttpContext.Current.Request.Form("UserName")
        Dim TransaksiID As String = HttpContext.Current.Request.Form("TransaksiID")
        'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileSizing As String = String.Empty
        Dim FileId As Guid

        Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/FileUIDESK/FileQuotation/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "")))
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
                    Dim FilePath As String = "apps/FileUIDESK/FileQuotation/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/"
                    If FileSize > 2 Then
                        Response.Guid = FileId
                        Response.FileName = FileName
                        Response.FileExt = FileExt
                        Response.FileSizing = FileSizing
                        Response.ResultUpload = "Please upload file less than 2 MB. Thanks!"
                    Else
                        File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
                    End If
                    'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))
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
        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)

        Try
            Dim path As String = HttpContext.Current.Server.MapPath("~/apps/FileUIDESK/FileQuotation/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/" & String.Concat(FileId, FileExt))
            Dim TrxUrl As String = "FileUIDESK/FileQuotation/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy").Replace("..", "") & "/" & String.Concat(FileId, FileExt)

            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            Try
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "APPS_UIDESK_QUOTATION_ATTACHMENT_SP"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TransaksiID", TransaksiID)
                    sqlComm.Parameters.AddWithValue("QuotationID", "0")
                    sqlComm.Parameters.AddWithValue("URL", TrxUrl)
                    sqlComm.Parameters.AddWithValue("FolderName", strLogTime)
                    sqlComm.Parameters.AddWithValue("FileName", HttpUtility.UrlDecode(FileName))
                    sqlComm.Parameters.AddWithValue("Extension", FileExt)
                    sqlComm.Parameters.AddWithValue("Size", FileSizing)
                    sqlComm.Parameters.AddWithValue("UserName", UserCreate)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Catch ex As Exception

                strExec = "exec APPS_UIDESK_QUOTATION_ATTACHMENT_SP '" & TransaksiID & "','0','" & TrxUrl & "','" & strLogTime & "','" & HttpUtility.UrlDecode(FileName) & "','" & FileExt & "','" & FileSizing & "','" & UserCreate & "'"
                LogError(HttpContext.Current.Session("UserName"), ex, strExec)
            Finally

                strExec = "exec APPS_UIDESK_QUOTATION_ATTACHMENT_SP '" & TransaksiID & "','0','" & TrxUrl & "','" & strLogTime & "','" & HttpUtility.UrlDecode(FileName) & "','" & FileExt & "','" & FileSizing & "','" & UserCreate & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                ''End
            End Try

        Catch __unusedException1__ As Exception
        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try
        Return Response
    End Function
End Class