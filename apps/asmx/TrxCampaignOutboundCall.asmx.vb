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
'<System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class TrxCampaignOutboundCall1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlconWA As New SqlConnection(ConfigurationManager.ConnectionStrings("WAConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim Proses As New ClsConn
    Public Class resultInsert
        Public Property Result As String
        Public Property TrxID As String
        Public Property NamaNya As String
        Public Property TrxmsgSystem As String
        Public Property TicketNumber As String
        Public Property CustomerID As String
    End Class
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
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertProductCampaign(ByVal TrxUserName As String, ByVal TrxCampaignName As String,
                                                  ByVal TrxCampaignDescription As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaign"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxCampaignName", TrxCampaignName)
                sqlComm.Parameters.AddWithValue("TrxCampaignChannel", "Outbound Call")
                sqlComm.Parameters.AddWithValue("TrxCampaignDescription", TrxCampaignDescription)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
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
            strExec = "exec UIDESK_TrxCampaign '0','" & TrxCampaignName & "','Outbound Call','" & TrxCampaignDescription & "','" & TrxStatus & "','" & TrxUserName & "','Insert'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Product Campaign Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaign '0','" & TrxCampaignName & "','Outbound Call','" & TrxCampaignDescription & "','" & TrxStatus & "','" & TrxUserName & "','Insert'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaign '0','" & TrxCampaignName & "','Outbound Call','" & TrxCampaignDescription & "','" & TrxStatus & "','" & TrxUserName & "','Insert'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _Valuenya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateProductCampaign(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxCampaignName As String,
                                                 ByVal TrxCampaignDescription As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaign"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxCampaignName", TrxCampaignName)
                sqlComm.Parameters.AddWithValue("TrxCampaignChannel", "Outbound Call")
                sqlComm.Parameters.AddWithValue("TrxCampaignDescription", TrxCampaignDescription)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
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
            strExec = "exec UIDESK_TrxCampaign '" & TrxID & "','" & TrxCampaignName & "','" & TrxCampaignDescription & "','Outbound Call','" & TrxStatus & "','" & TrxUserName & "','Update'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaign '" & TrxID & "','" & TrxCampaignName & "','" & TrxCampaignDescription & "','Outbound Call','" & TrxStatus & "','" & TrxUserName & "','Update'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaign '" & TrxID & "','" & TrxCampaignName & "','" & TrxCampaignDescription & "','Outbound Call','" & TrxStatus & "','" & TrxUserName & "','Update'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _Valuenya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteProductCampaign(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaign"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxCampaignName", "0")
                sqlComm.Parameters.AddWithValue("TrxCampaignChannel", "0")
                sqlComm.Parameters.AddWithValue("TrxCampaignDescription", "0")
                sqlComm.Parameters.AddWithValue("TrxStatus", "0")
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
            strExec = "exec UIDESK_TrxCampaign '" & TrxID & "','" & TrxUserName & "','0','0','0','0','Delete'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Has Been Delete"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaign '" & TrxID & "','" & TrxUserName & "','0','0','0','0','Delete'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaign '" & TrxID & "','" & TrxUserName & "','0','0','0','0','Delete'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _Valuenya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class