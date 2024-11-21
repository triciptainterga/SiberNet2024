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

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class TrmUploadCustomer1
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
    Public Function UploadCustomer() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/FileUploadOutbound/FileCustomer/")
        Dim Username As String = HttpContext.Current.Request.Form("Username")
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
                    Dim FilePath As String = "/FileUploadOutbound/FileCustomer/"
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
        'SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; 
        'HDR=NO; IMEX=1; Database=\\ptmkpwa12dev08.pertamina.com\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx', 'SELECT * FROM [Sheet1$]')

        '''Coba new
        'Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        'Dim TrxCustomerName, TrxBirth, TrxJenisKelamin, TrxEmail, TrxAlamat, TrxHome, TrxOffice, TrxHP, TrxNIK, TrxNomorPolis As String

        'Try
        '    Dim path As String = HttpContext.Current.Server.MapPath("~/FileUploadCustomer/" & String.Concat(FileId, FileExt))
        '    'Dim pathNya As String = "E:\#2020\RND\Helpdesk_Wagent\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx"
        '    Dim excelCS As String = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Database={0};Extended Properties=Excel 12.0;HDR=NO; IMEX=1;", path)

        '    'Dim sqlImport As String = "SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; " &
        '    '                           "HDR=NO; IMEX=1; Database=E:\#2020\RND\Helpdesk_Wagent\UploadFile\" & String.Concat(FileId) & ".xlsx', 'SELECT *,''" & String.Concat(FileId) & "'' as IDupload FROM [Sheet1$]')"
        '    Dim sqlImport As String = "exec UIDESK_TrxUploadCustomer_SelectExcel '" & String.Concat(FileId) & "'"
        '    Dim cmd As SqlCommand = New SqlCommand(sqlImport, sqlconManual)
        '    cmd.CommandType = CommandType.Text

        '    sqlconManual.Open()
        '    Dim rdr As SqlDataReader = cmd.ExecuteReader()
        '    Dim strExec As String = String.Empty
        '    Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        '    While rdr.Read()
        '        'If insertTable("bulkDataUpload", "nopek, Nama, Realisasi, IDupload, SourceTest,DateRealisasi", "" & rdr("F1").ToString & "," & rdr("F2").ToString & "," & rdr("F3").ToString & "," & rdr("IDupload").ToString & "," & rdr("F4").ToString & "," & rdr("F5").ToString & "") = True Then
        '        TrxCustomerName = rdr("F1").ToString
        '        TrxBirth = rdr("F2").ToString
        '        TrxJenisKelamin = rdr("F3").ToString
        '        TrxEmail = rdr("F4").ToString
        '        TrxAlamat = rdr("F5").ToString
        '        TrxHome = rdr("F6").ToString
        '        TrxOffice = rdr("F7").ToString
        '        TrxHP = rdr("F8").ToString
        '        TrxNIK = rdr("F9").ToString
        '        TrxNomorPolis = rdr("F10").ToString

        '        Try
        '            Using con As New SqlConnection(constr)
        '                Dim sqlComm As New SqlCommand()
        '                sqlComm.Connection = con
        '                sqlComm.CommandText = "UIDESK_TrxUploadCustomer_ExecuteTransaksi"
        '                sqlComm.CommandType = CommandType.StoredProcedure
        '                sqlComm.Parameters.AddWithValue("TrxCustomerName", TrxCustomerName)
        '                sqlComm.Parameters.AddWithValue("TrxBirth", TrxBirth)
        '                sqlComm.Parameters.AddWithValue("TrxJenisKelamin", TrxJenisKelamin)
        '                sqlComm.Parameters.AddWithValue("TrxEmail", TrxEmail)
        '                sqlComm.Parameters.AddWithValue("Username", Username)
        '                sqlComm.Parameters.AddWithValue("TrxAlamat", TrxAlamat)
        '                sqlComm.Parameters.AddWithValue("TrxHome", TrxHome)
        '                sqlComm.Parameters.AddWithValue("TrxOffice", TrxOffice)
        '                sqlComm.Parameters.AddWithValue("TrxHP", TrxHP)
        '                sqlComm.Parameters.AddWithValue("TrxNIK", TrxNIK)
        '                sqlComm.Parameters.AddWithValue("TrxNomorPolis", TrxNomorPolis)
        '                con.Open()
        '                sqlComm.ExecuteNonQuery()
        '            End Using
        '        Catch ex As Exception
        '            strExec = "exec UIDESK_TrxUploadCustomer_ExecuteTransaksi '" & TrxCustomerName & "','" & TrxBirth & "','" & TrxJenisKelamin & "','" & TrxEmail & "','" & Username & "','" & TrxAlamat & "','" & TrxHome & "','" & TrxOffice & "','" & TrxHP & "','" & TrxNIK & "','" & TrxNomorPolis & "'"
        '            LogError(strLogTime, ex, strExec)
        '        Finally
        '            strExec = "exec UIDESK_TrxUploadCustomer_ExecuteTransaksi '" & TrxCustomerName & "','" & TrxBirth & "','" & TrxJenisKelamin & "','" & TrxEmail & "','" & Username & "','" & TrxAlamat & "','" & TrxHome & "','" & TrxOffice & "','" & TrxHP & "','" & TrxNIK & "','" & TrxNomorPolis & "'"
        '            LogSuccess(strLogTime, strExec)
        '            ''End
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
    Public Function Upload_InsertCustomer(ByVal TrxUploadID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        Dim TrxCustomerName, TrxBirth, TrxJenisKelamin, TrxEmail, TrxAlamat, TrxHome, TrxOffice, TrxHP, TrxNIK, TrxNomorPolis As String

        Try
            Dim sqlImport As String = "exec UIDESK_TrxUploadCustomer_SelectExcel '" & String.Concat(TrxUploadID) & "'"
            Dim cmd As SqlCommand = New SqlCommand(sqlImport, sqlconManual)
            cmd.CommandType = CommandType.Text

            sqlconManual.Open()
            Dim rdr As SqlDataReader = cmd.ExecuteReader()
            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            While rdr.Read()
                'If insertTable("bulkDataUpload", "nopek, Nama, Realisasi, IDupload, SourceTest,DateRealisasi", "" & rdr("F1").ToString & "," & rdr("F2").ToString & "," & rdr("F3").ToString & "," & rdr("IDupload").ToString & "," & rdr("F4").ToString & "," & rdr("F5").ToString & "") = True Then
                TrxCustomerName = rdr("F1").ToString
                TrxBirth = rdr("F2").ToString
                TrxJenisKelamin = rdr("F3").ToString
                TrxEmail = rdr("F4").ToString
                TrxAlamat = rdr("F5").ToString
                TrxHome = rdr("F6").ToString
                TrxOffice = rdr("F7").ToString
                TrxHP = rdr("F8").ToString
                TrxNIK = rdr("F9").ToString
                TrxNomorPolis = rdr("F10").ToString

                Try
                    Using con As New SqlConnection(constr)
                        Dim sqlComm As New SqlCommand()
                        sqlComm.Connection = con
                        sqlComm.CommandText = "UIDESK_TrxUploadCustomer_ExecuteTransaksi"
                        sqlComm.CommandType = CommandType.StoredProcedure
                        sqlComm.Parameters.AddWithValue("TrxCustomerName", TrxCustomerName)
                        sqlComm.Parameters.AddWithValue("TrxBirth", TrxBirth)
                        sqlComm.Parameters.AddWithValue("TrxJenisKelamin", TrxJenisKelamin)
                        sqlComm.Parameters.AddWithValue("TrxEmail", TrxEmail)
                        sqlComm.Parameters.AddWithValue("Username", TrxUserName)
                        sqlComm.Parameters.AddWithValue("TrxAlamat", TrxAlamat)
                        sqlComm.Parameters.AddWithValue("TrxHome", TrxHome)
                        sqlComm.Parameters.AddWithValue("TrxOffice", TrxOffice)
                        sqlComm.Parameters.AddWithValue("TrxHP", TrxHP)
                        sqlComm.Parameters.AddWithValue("TrxNIK", TrxNIK)
                        sqlComm.Parameters.AddWithValue("TrxNomorPolis", TrxNomorPolis)
                        con.Open()
                        sqlComm.ExecuteNonQuery()
                    End Using
                Catch ex As Exception
                    strExec = "exec UIDESK_TrxUploadCustomer_ExecuteTransaksi '" & TrxCustomerName & "','" & TrxBirth & "','" & TrxJenisKelamin & "','" & TrxEmail & "','" & TrxUserName & "','" & TrxAlamat & "','" & TrxHome & "','" & TrxOffice & "','" & TrxHP & "','" & TrxNIK & "','" & TrxNomorPolis & "'"
                    LogError(HttpContext.Current.Session("UserName"), ex, strExec)
                Finally
                    strExec = "exec UIDESK_TrxUploadCustomer_ExecuteTransaksi '" & TrxCustomerName & "','" & TrxBirth & "','" & TrxJenisKelamin & "','" & TrxEmail & "','" & TrxUserName & "','" & TrxAlamat & "','" & TrxHome & "','" & TrxOffice & "','" & TrxHP & "','" & TrxNIK & "','" & TrxNomorPolis & "'"
                    LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                    ''End
                End Try
                'End If
            End While
        Catch __unusedException1__ As Exception
        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class