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
Public Class TrmCallProfile1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlconWA As New SqlConnection(ConfigurationManager.ConnectionStrings("WAConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn

    Public Class ResultInsert
        Public Property Result As String
        Public Property TrxID As String
        Public Property TrxUserName As String
        Public Property TrxPriorityScale As String
        Public Property TrxCallback As String
        Public Property TrxCallStatus As String
        Public Property TrxCallNote As String
        Public Property TrxStatus As String
        Public Property TrxUser As String
        Public Property TrxDate As String
        Public Property TrxmsgSystem As String
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
    Public Function InsertTransactionAddNoteOutbound(ByVal TrxCampaignDataID As String, ByVal TrxUserName As String, ByVal TrxPriority As String, ByVal TrxCallback As String,
                                                 ByVal TrxStatus As String, ByVal TrxNote As String, ByVal RecordingFile As String) As String
        Dim listTickets As List(Of ResultInsert) = New List(Of ResultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaignNote"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxCampaignDataID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxPriority", TrxPriority)
                sqlComm.Parameters.AddWithValue("TrxCallback", TrxCallback)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxNote", HttpUtility.UrlDecode(TrxNote))
                sqlComm.Parameters.AddWithValue("RecordingFile", RecordingFile)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultInsert = New ResultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxCampaignNote '" & TrxCampaignDataID & "','" & TrxUserName & "','" & TrxPriority & "','" & TrxCallback & "','" & TrxStatus & "','" & TrxNote & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As ResultInsert = New ResultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = TrxCampaignDataID
                objectTickets.TrxmsgSystem = "Data Note Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignNote '" & TrxCampaignDataID & "','" & TrxUserName & "','" & TrxPriority & "','" & TrxCallback & "','" & TrxStatus & "','" & TrxNote & "'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = TrxCampaignDataID
                objectTickets.TrxmsgSystem = "Data Note Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignNote '" & TrxCampaignDataID & "','" & TrxUserName & "','" & TrxPriority & "','" & TrxCallback & "','" & TrxStatus & "','" & TrxNote & "'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, "Data Note Has Been Save")
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
  <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertTransactionCampaignReminder(ByVal TrxTableID As String, ByVal TrxCampaignDataID As String, ByVal TrxUserName As String, ByVal TrxSubject As String, ByVal TrxDescription As String,
                                                      ByVal TrxDate As String, ByVal TrxAccount As String, ByVal TrxChannel As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of ResultInsert) = New List(Of ResultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaignReminder"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxTableID", TrxTableID)
                sqlComm.Parameters.AddWithValue("TrxID", TrxCampaignDataID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubject)
                sqlComm.Parameters.AddWithValue("TrxDescription", HttpUtility.UrlDecode(TrxDescription))
                sqlComm.Parameters.AddWithValue("TrxDate", TrxDate)
                sqlComm.Parameters.AddWithValue("TrxAccount", TrxAccount)
                sqlComm.Parameters.AddWithValue("TrxChannel", TrxChannel)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultInsert = New ResultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxCampaignReminder '" & TrxTableID & "','" & TrxCampaignDataID & "','" & TrxUserName & "','" & TrxSubject & "','" & HttpUtility.UrlDecode(TrxDescription) & "','" & TrxDate & "','" & TrxAccount & "','" & TrxChannel & "','" & TrxStatus & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As ResultInsert = New ResultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = TrxCampaignDataID
                objectTickets.TrxmsgSystem = "Data Reminder Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignReminder '" & TrxTableID & "','" & TrxCampaignDataID & "','" & TrxUserName & "','" & TrxSubject & "','" & HttpUtility.UrlDecode(TrxDescription) & "','" & TrxDate & "','" & TrxAccount & "','" & TrxChannel & "','" & TrxStatus & "'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = TrxCampaignDataID
                objectTickets.TrxmsgSystem = "Data Reminder Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignReminder '" & TrxTableID & "','" & TrxCampaignDataID & "','" & TrxUserName & "','" & TrxSubject & "','" & HttpUtility.UrlDecode(TrxDescription) & "','" & TrxDate & "','" & TrxAccount & "','" & TrxChannel & "','" & TrxStatus & "'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, "Data Reminder Has Been Save")
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class