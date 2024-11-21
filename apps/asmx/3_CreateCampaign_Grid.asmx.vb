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
Public Class _3_CreateCampaign_Grid1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn
    Public Class listTransactionThread
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
    Public Class ResponseDelete
        Public Guid As Guid
        Public ResultNya As String
        Public FileName As String
        Public FileExt As String
    End Class
    Public Class resultInsert
        Public Property Result As String
        Public Property TrxID As String
        Public Property TrxUserName As String
        Public Property TrxStatus As String
        Public Property TrxUser As String
        Public Property TrxDate As String
        Public Property TrxmsgSystem As String
    End Class
    <WebMethod>
    Public Function UploadFile() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/FileBlast/")
        Dim Username As String = HttpContext.Current.Request.Form("Username")
        Dim TypeChannel As String = HttpContext.Current.Request.Form("TypeChannel")
        Dim idHeader As String = HttpContext.Current.Request.Form("idHeader")
        Dim idTable As String = HttpContext.Current.Request.Form("idTable")
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
            Dim FilePath As String = "/FileBlast/"
            File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
            'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))

        Next
        Response.Guid = FileId
        Response.FileName = FileName
        Response.FileExt = FileExt
        'SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; 
        'HDR=NO; IMEX=1; Database=\\ptmkpwa12dev08.pertamina.com\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx', 'SELECT * FROM [Sheet1$]')

        ''Coba new
        Dim sqlconManual As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
        Dim TrxStatus, TrxNoHP, TrxMsgBlast, TrxFileAttch As String

        Try
            Dim path As String = HttpContext.Current.Server.MapPath("~/FileBlast/" & String.Concat(FileId, FileExt))
            Dim pathNya As String = "E:\#2020\RND\Helpdesk_Wagent\UploadFile\4ae19bf0-efe5-47ec-bc1a-54035e04e082.xlsx"
            Dim excelCS As String = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Database={0};Extended Properties=Excel 12.0;HDR=NO; IMEX=1;", pathNya)

            'Dim sqlImport As String = "SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0; " &
            '                           "HDR=NO; IMEX=1; Database=E:\#2020\RND\Helpdesk_Wagent\UploadFile\" & String.Concat(FileId) & ".xlsx', 'SELECT *,''" & String.Concat(FileId) & "'' as IDupload FROM [Sheet1$]')"
            Dim sqlImport As String = "exec WA_Tr_SelectExcel '" & String.Concat(FileId) & "'"
            Dim cmd As SqlCommand = New SqlCommand(sqlImport, sqlconManual)
            cmd.CommandType = CommandType.Text

            sqlconManual.Open()
            Dim rdr As SqlDataReader = cmd.ExecuteReader()
            Dim strExec As String = String.Empty
            Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
            While rdr.Read()
                'If insertTable("bulkDataUpload", "nopek, Nama, Realisasi, IDupload, SourceTest,DateRealisasi", "" & rdr("F1").ToString & "," & rdr("F2").ToString & "," & rdr("F3").ToString & "," & rdr("IDupload").ToString & "," & rdr("F4").ToString & "," & rdr("F5").ToString & "") = True Then
                TrxStatus = rdr("F1").ToString
                TrxNoHP = rdr("F2").ToString
                TrxMsgBlast = rdr("F3").ToString
                TrxFileAttch = rdr("F4").ToString

                Try
                    Using con As New SqlConnection(constr)
                        Dim sqlComm As New SqlCommand()
                        sqlComm.Connection = con
                        sqlComm.CommandText = "WA_Tr_ImportBlast"
                        sqlComm.CommandType = CommandType.StoredProcedure
                        sqlComm.Parameters.AddWithValue("Status", TrxStatus)
                        sqlComm.Parameters.AddWithValue("NoHP", TrxNoHP)
                        'sqlComm.Parameters.AddWithValue("MsgBlast", TrxMsgBlast)
                        'sqlComm.Parameters.AddWithValue("FileAttch", TrxFileAttch)
                        sqlComm.Parameters.AddWithValue("UserCreate", Username)
                        sqlComm.Parameters.AddWithValue("TypeChannel", TypeChannel)
                        sqlComm.Parameters.AddWithValue("idHeader", idHeader)
                        sqlComm.Parameters.AddWithValue("idTable", idTable)
                        con.Open()
                        sqlComm.ExecuteNonQuery()
                    End Using
                Catch ex As Exception

                    strExec = "exec WA_Tr_ImportBlast " & "'" & TrxStatus & "'," & "'" & TrxNoHP & "'," & "'" & TrxMsgBlast & "'," & "'" & TrxFileAttch & "'"
                    LogError(strLogTime, ex, strExec)
                Finally

                    strExec = "exec WA_Tr_ImportBlast " & "'" & TrxStatus & "'," & "'" & TrxNoHP & "'," & "'" & TrxMsgBlast & "'," & "'" & TrxFileAttch & "'"
                    LogSuccess(strLogTime, strExec)
                    ''End
                End Try
                'End If
            End While


        Catch __unusedException1__ As Exception

        Finally
            'updateTable("bulkDataUpload", "Usercreate", "" & Username & "", "IDupload='" & String.Concat(FileId) & "'")
        End Try
        Return Response

    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GenerateDataBlast(ByVal Keterangan As String) As String
        Dim listTickets As List(Of listTransactionThread) = New List(Of listTransactionThread)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        Try
            strQuery = "Exec WA_Tr_TableToBlast '" & Keterangan & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTransactionThread = New listTransactionThread()
                    objectTickets.Result = "True"

                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(strLogTime, ex, strQuery)
        Finally
            LogSuccess(strLogTime, strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateDataBlast(ByVal Keterangan As String, ByVal type As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of listTransactionThread) = New List(Of listTransactionThread)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        Try
            strQuery = "Exec WA_Update_TableToBlast '" & Keterangan & "','" & type & "','" & TrxUserName & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTransactionThread = New listTransactionThread()
                    objectTickets.Result = "True"

                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(strLogTime, ex, strQuery)
        Finally
            LogSuccess(strLogTime, strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
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
    <WebMethod()>
  <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertTransactionTrmCampaignData(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxChannelAccount As String, ByVal TrxCampaignName As String, ByVal TrxCampaignChannel As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaignData"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxChannelAccount", TrxChannelAccount)
                sqlComm.Parameters.AddWithValue("TrxCampaignName", TrxCampaignName)
                sqlComm.Parameters.AddWithValue("TrxCampaignChannel", TrxCampaignChannel)
                sqlComm.Parameters.AddWithValue("TrxAction", "Insert")
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _Valuenya &= sqldr("Valuenya").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxCampaignData '" & TrxID & "','" & TrxUserName & "','" & TrxChannelAccount & "','" & TrxCampaignName & "','" & TrxCampaignChannel & "','Insert'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Data Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignData '" & TrxID & "','" & TrxUserName & "','" & TrxChannelAccount & "','" & TrxCampaignName & "','" & TrxCampaignChannel & "','Insert'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignData '" & TrxID & "','" & TrxUserName & "','" & TrxChannelAccount & "','" & TrxCampaignName & "','" & TrxCampaignChannel & "','Insert'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, _Valuenya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
  <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateTransactionTrmCampaignData(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxChannelAccount As String, ByVal TrxCampaignName As String, ByVal TrxCampaignChannel As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaignData"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxChannelAccount", TrxChannelAccount)
                sqlComm.Parameters.AddWithValue("TrxCampaignName", TrxCampaignName)
                sqlComm.Parameters.AddWithValue("TrxCampaignChannel", TrxCampaignChannel)
                sqlComm.Parameters.AddWithValue("TrxAction", "Update")
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _Valuenya &= sqldr("Valuenya").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxCampaignData '" & TrxID & "','" & TrxUserName & "','" & TrxChannelAccount & "','" & TrxCampaignName & "','" & TrxCampaignChannel & "','Update'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Data Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignData '" & TrxID & "','" & TrxUserName & "','" & TrxChannelAccount & "','" & TrxCampaignName & "','" & TrxCampaignChannel & "','Update'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignData '" & TrxID & "','" & TrxUserName & "','" & TrxChannelAccount & "','" & TrxCampaignName & "','" & TrxCampaignChannel & "','Update'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, _Valuenya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
  <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteTransactionTrmCampaignData(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaignData"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxChannelAccount", "0")
                sqlComm.Parameters.AddWithValue("TrxCampaignName", "0")
                sqlComm.Parameters.AddWithValue("TrxCampaignChannel", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", "Delete")
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _Valuenya &= sqldr("Valuenya").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxCampaignData '" & TrxID & "','" & TrxUserName & "','Delete'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Data Has Been Delete"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignData '" & TrxID & "','" & TrxUserName & "','Delete'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignData '" & TrxID & "','" & TrxUserName & "','Delete'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, _Valuenya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class