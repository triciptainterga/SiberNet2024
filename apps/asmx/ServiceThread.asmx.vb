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
Imports System.Web.Security.AntiXss
' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
'<System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
<ScriptService()>
<ToolboxItem(False)> _
Public Class ServiceThread
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn

    Public Class resultInsert
        Public Property Result As String
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property msgSystem As String
        Public Property TicketNumber As String
        Public Property CustomerID As String
    End Class
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
        Public Property TrxThreadaDateCreate As DateTime
        Public Property TrxThreadaReason As String
        Public Property TrxThreadCustomerName As String
        Public Property TrxThreadCategoryID As String
        Public Property TrxThreadCategory As String
        Public Property TrxThreadAssetID As String
        Public Property TrxThreadAsset As String
        Public Property TrxThreadProblemID As String
        Public Property TrxThreadProblem As String
        Public Property TrxThreadPriority As String
        Public Property TrxThreadDescription As String
        Public Property TrxThreadDateTransaction As String
    End Class
    Public Class listTransactionInstanNote
        Public Property Result As String
        Public Property TrxID As String
        Public Property TrxNote As String
        Public Property TrxUserCreate As String
        Public Property TrxDateCreate As String
        Public Property TrxDateView As String
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
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ThreadDataSelect(ByVal TrxUserName As String, ByVal TrxUnitKerja As String, ByVal TrxLevelUser As String) As String
        Dim listTickets As List(Of listTransactionThread) = New List(Of listTransactionThread)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        Try
            strQuery = "Exec TR_DataThread '" & TrxLevelUser & "', '" & TrxUserName & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTransactionThread = New listTransactionThread()
                    objectTickets.Result = "True"
                    objectTickets.TrxID = rdr("ID").ToString()
                    objectTickets.TrxThreadID = rdr("ThreadID").ToString()
                    objectTickets.TrxThreadChannel = rdr("ValueThread").ToString()
                    objectTickets.TrxIconThreadChannel = rdr("IconValueThread").ToString()
                    objectTickets.TrxThreadNumberID = rdr("GenesysNumber").ToString()
                    objectTickets.TrxThreadAccount = rdr("Account").ToString()
                    objectTickets.TrxThreadContactID = rdr("AccountContactID").ToString()
                    objectTickets.TrxThreadaAgentID = rdr("AgentID").ToString()
                    objectTickets.TrxThreadSubject = rdr("Subject").ToString()
                    objectTickets.TrxThreadCustomer = rdr("CustomerID").ToString()
                    objectTickets.TrxThreadCustomerName = rdr("ThreadCustomerName").ToString()
                    objectTickets.TrxThreadTicketNumber = rdr("TicketNumber").ToString()
                    objectTickets.TrxThreadaDateCreate = rdr("DateCreate").ToString()
                    objectTickets.TrxThreadCategoryID = rdr("ThreadCategoryID").ToString()
                    objectTickets.TrxThreadCategory = rdr("ThreadCategory").ToString()
                    objectTickets.TrxThreadAssetID = rdr("ThreadAssetID").ToString()
                    objectTickets.TrxThreadAsset = rdr("ThreadAsset").ToString()
                    objectTickets.TrxThreadProblemID = rdr("ThreadProblemID").ToString()
                    objectTickets.TrxThreadProblem = rdr("ThreadProblem").ToString()
                    objectTickets.TrxThreadPriority = rdr("ThreadPriority").ToString()
                    objectTickets.TrxThreadDescription = rdr("ThreadDescription").ToString()
                    objectTickets.TrxThreadDateTransaction = rdr("DateTransaction").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateDataThread(ByVal TrxUserName As String, ByVal TrxID As String, ByVal TrxType As String, ByVal TrxReason As String) As String
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_UpdateThread"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxReason", HttpUtility.UrlDecode(TrxReason))
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_UpdateThread " & "'" & UserNameXSS & "'," & "'" & HttpUtility.UrlDecode(TrxReason) & "'," & "'" & TrxID & "'," & "'" & TrxType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Thread Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_UpdateThread " & "'" & UserNameXSS & "'," & "'" & HttpUtility.UrlDecode(TrxReason) & "'," & "'" & TrxID & "'," & "'" & TrxType & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ThreadSelected(ByVal TrxNumberID As String) As String
        Dim listTickets As List(Of listTransactionThread) = New List(Of listTransactionThread)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        Try
            strQuery = "Exec UIDESK_Temp_ThreadSelected '" & TrxNumberID & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTransactionThread = New listTransactionThread()
                    objectTickets.Result = "True"
                    objectTickets.TrxThreadaReason = rdr("ThreadReason").ToString()
                    objectTickets.TrxThreadDescription = rdr("ThreadDescription").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ActionTransactionKotak(ByVal UserID As String, ByVal LayerID As String, ByVal Spv As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec SP_TempKotakThread '" & UserID & "','" & LayerID & "','" & Spv & "'"

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
    Public Function ThreadDataSelectInstanNote(ByVal TrxID As String, ByVal TrxType As String) As String
        Dim listTickets As List(Of listTransactionInstanNote) = New List(Of listTransactionInstanNote)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        Try
            strQuery = "Exec UIDESK_Temp_SelectInstanNote '" & TrxID & "', '" & TrxType & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTransactionInstanNote = New listTransactionInstanNote()
                    objectTickets.Result = "True"
                    objectTickets.TrxID = rdr("NUMBER_ID").ToString()
                    objectTickets.TrxNote = rdr("NOTE").ToString()
                    objectTickets.TrxUserCreate = rdr("USERCREATE").ToString()
                    objectTickets.TrxDateCreate = rdr("DATECREATE").ToString()
                    objectTickets.TrxDateView = rdr("TrxDateView").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError(HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess(HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function PickupDataThread(ByVal TrxUserName As String, ByVal TrxNumberID As String, ByVal TrxChannel As String) As String
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxChannelXSS As String = AntiXssEncoder.HtmlEncode(TrxChannel.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _AgentName As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxPickupThread"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxNumberID", HttpUtility.UrlDecode(TrxNumberID))
                sqlComm.Parameters.AddWithValue("TrxChannel", TrxChannelXSS)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _AgentName &= sqldr("AgentName").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxPickupThread " & "'" & TrxUserNameXSS & "','" & HttpUtility.UrlDecode(TrxNumberID) & "','" & TrxChannelXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = _AgentName
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxPickupThread " & "'" & TrxUserNameXSS & "','" & HttpUtility.UrlDecode(TrxNumberID) & "','" & TrxChannelXSS & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DataTableThread(ByVal TrxUserName As String, ByVal TrxUnitKerja As String, ByVal TrxLevelUser As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "Exec TR_DataThread '" & TrxLevelUser & "', '" & TrxUserName & "'"

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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertThreadTemporary(ByVal TrxChannel As String, ByVal TrxNumberID As String, ByVal TrxThreadID As String, ByVal TrxChannelAccount As String,
                                            ByVal TrxUserName As String, ByVal TrxTicketNumber As String, ByVal TrxCustomerID As String, ByVal TrxCustomerName As String) As String
        Dim TrxChannelXSS As String = AntiXssEncoder.HtmlEncode(TrxChannel.Trim, True)
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxChannelAccountXSS As String = AntiXssEncoder.HtmlEncode(TrxChannelAccount.Trim, True)
        Dim TrxCustomerNameXSS As String = AntiXssEncoder.HtmlEncode(TrxCustomerName.Trim, True)
        Dim TrxCustomerIDXSS As String = AntiXssEncoder.HtmlEncode(TrxCustomerID.Trim, True)

        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxThreadTemp"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxChannel", TrxChannelXSS)
                sqlComm.Parameters.AddWithValue("TrxNumberID", TrxNumberID)
                sqlComm.Parameters.AddWithValue("TrxThreadID", TrxThreadID)
                sqlComm.Parameters.AddWithValue("TrxChannelAccount", TrxChannelAccountXSS)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxTicketNumber", TrxTicketNumber)
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerIDXSS)
                sqlComm.Parameters.AddWithValue("TrxCustomerName", TrxCustomerNameXSS)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxThreadTemp '" & TrxChannelXSS & "','" & TrxNumberID & "','" & TrxThreadID & "','" & TrxChannelAccountXSS & "','" & UserNameXSS & "','" & TrxTicketNumber & "','" & TrxCustomerIDXSS & "','" & TrxCustomerNameXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Thread Temp Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxThreadTemp '" & TrxChannelXSS & "','" & TrxNumberID & "','" & TrxThreadID & "','" & TrxChannelAccountXSS & "','" & UserNameXSS & "','" & TrxTicketNumber & "','" & TrxCustomerIDXSS & "','" & TrxCustomerNameXSS & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class