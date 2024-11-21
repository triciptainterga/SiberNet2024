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
Imports System.Runtime.InteropServices
Imports System.Web.Security.AntiXss

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class TrxReleaseOutbound1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim Proses As New ClsConn
    Public Class ResultInsert
        Public Property Result As String
        Public Property ResultID As String
        Public Property ResultMessage As String
        Public Property ResultDescription As String
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
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DataTableDetailTransaksi(ByVal ParameterID As String, ByVal UserName As String, ByVal ParameterType As String,
                                             ByVal ParameterValue As String, ByVal ParameterAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim XSSParameterID As String = AntiXssEncoder.HtmlEncode(ParameterID.Trim, True)
        Dim XSSUserName As String = AntiXssEncoder.HtmlEncode(UserName.Trim, True)
        Dim XSSParameterType As String = AntiXssEncoder.HtmlEncode(ParameterType.Trim, True)
        Dim XSSParameterValue As String = AntiXssEncoder.HtmlEncode(ParameterValue.Trim, True)
        Dim XSSParameterAction As String = AntiXssEncoder.HtmlEncode(ParameterAction.Trim, True)

        Dim NameSP = "Exec V2_UIDESK_ReleaseDataOutbound"
        Dim ExecSP = "" & NameSP & " '" & XSSParameterID & "','" & XSSUserName & "','" & XSSParameterType & "','" & XSSParameterValue & "','" & XSSParameterAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("V2_UIDESK_ReleaseDataOutbound", conn)
                sqlComm.Parameters.AddWithValue("@ParameterID", XSSParameterID)
                sqlComm.Parameters.AddWithValue("@UserName", XSSUserName)
                sqlComm.Parameters.AddWithValue("@ParameterType", XSSParameterType)
                sqlComm.Parameters.AddWithValue("@ParameterValue", XSSParameterValue)
                sqlComm.Parameters.AddWithValue("@ParameterAction", XSSParameterAction)
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
        Dim tableJson As String = ConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DataTableHeaderTransaksi(ByVal ParameterID As String, ByVal UserName As String, ByVal ParameterType As String, ByVal ParameterValue As String, ByVal ParameterAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim XSSParameterID As String = AntiXssEncoder.HtmlEncode(ParameterID.Trim, True)
        Dim XSSUserName As String = AntiXssEncoder.HtmlEncode(UserName.Trim, True)
        Dim XSSParameterType As String = AntiXssEncoder.HtmlEncode(ParameterType.Trim, True)
        Dim XSSParameterValue As String = AntiXssEncoder.HtmlEncode(ParameterValue.Trim, True)
        Dim XSSParameterAction As String = AntiXssEncoder.HtmlEncode(ParameterAction.Trim, True)

        Dim NameSP = "Exec V2_UIDESK_ReleaseDataOutbound"
        Dim ExecSP = "" & NameSP & " '" & XSSParameterID & "','" & XSSUserName & "','" & XSSParameterType & "','" & XSSParameterValue & "','" & XSSParameterAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("V2_UIDESK_ReleaseDataOutbound", conn)
                sqlComm.Parameters.AddWithValue("@ParameterID", XSSParameterID)
                sqlComm.Parameters.AddWithValue("@UserName", XSSUserName)
                sqlComm.Parameters.AddWithValue("@ParameterType", XSSParameterType)
                sqlComm.Parameters.AddWithValue("@ParameterValue", XSSParameterValue)
                sqlComm.Parameters.AddWithValue("@ParameterAction", XSSParameterAction)
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
        Dim tableJson As String = ConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ReleaseOutboundCall(ByVal TrxID As String, ByVal TrxAgent As String, ByVal TrxCounting As String, ByVal TrxStatus As String,
                                        ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim listTickets As List(Of ResultInsert) = New List(Of ResultInsert)()
        Dim strExec As String = String.Empty

        Dim XSSTrxID As String = AntiXssEncoder.HtmlEncode(TrxID.Trim, True)
        Dim XSSTrxAgent As String = AntiXssEncoder.HtmlEncode(TrxAgent.Trim, True)
        Dim XSSTrxCounting As String = AntiXssEncoder.HtmlEncode(TrxCounting.Trim, True)
        Dim XSSTrxStatus As String = AntiXssEncoder.HtmlEncode(TrxStatus.Trim, True)
        Dim XSSTrxUserName As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim XSSTrxAction As String = AntiXssEncoder.HtmlEncode(TrxAction.Trim, True)

        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "V2_UIDESK_ReleaseOutboundSubmit"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", XSSTrxID)
                sqlComm.Parameters.AddWithValue("TrxAgent", XSSTrxAgent)
                sqlComm.Parameters.AddWithValue("TrxCounting", XSSTrxCounting)
                sqlComm.Parameters.AddWithValue("TrxStatus", XSSTrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUserName", XSSTrxUserName)
                sqlComm.Parameters.AddWithValue("TrxAction", XSSTrxAction)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As ResultInsert = New ResultInsert()
            objectTickets.Result = "False"
            listTickets.Add(objectTickets)
            strExec = "exec V2_UIDESK_ReleaseOutboundSubmit '" & XSSTrxID & "','" & XSSTrxAgent & "','" & XSSTrxCounting & "','" & XSSTrxStatus & "','" & XSSTrxUserName & "','" & XSSTrxAction & "',"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As ResultInsert = New ResultInsert()
            objectTickets.Result = "True"
            listTickets.Add(objectTickets)
            strExec = "exec V2_UIDESK_ReleaseOutboundSubmit '" & XSSTrxID & "','" & XSSTrxAgent & "','" & XSSTrxCounting & "','" & XSSTrxStatus & "','" & XSSTrxUserName & "','" & XSSTrxAction & "',"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class