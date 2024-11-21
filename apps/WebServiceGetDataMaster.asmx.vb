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
Public Class WebServiceGetDataMaster
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    'Dim sqlconWA As New SqlConnection(ConfigurationManager.ConnectionStrings("WAConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn
    Private TripleDes As New TripleDESCryptoServiceProvider
    Public Class resultInsert
        Public Property Result As String
        Public Property TrxID As String
        Public Property TrxUserName As String
        Public Property TrxStatus As String
        Public Property TrxUser As String
        Public Property TrxDate As String
        Public Property TrxmsgSystem As String
    End Class
    Public Class ResultUserApplication
        Public Property Result As String
        Public Property TrxID As String
        Public Property TrxName As String
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
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetWhereRecords(ByVal tableType As String, ByVal tableName As String, ByVal paramQuery As String) As String
        'Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        'Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        'Using conn As SqlConnection = New SqlConnection(connstring)
        '    conn.Open()
        '    If tableType = "AllWhereData" Then

        '        sql = "select * from [" & tableName & "] " & paramQuery & " "
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
                    sql = "select * from [" & tableName & "] " & paramQuery & " "
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
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetWhereRecordsBigData(ByVal tableType As String, ByVal tableName As String, ByVal paramQuery As String) As String
        'Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        'Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        'Using conn As SqlConnection = New SqlConnection(connstring)
        '    conn.Open()
        '    If tableType = "AllWhereData" Then

        '        sql = "select * from [" & tableName & "] " & paramQuery & " "
        '    End If
        '    Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
        '    Dim ds As DataSet = New DataSet()
        '    ad.Fill(ds)
        '    dt = ds.Tables(0)
        '    conn.Close()
        'End Using

        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Using conn As SqlConnection = New SqlConnection(connstring)
            conn.Open()
            If tableType = "AllWhereData" Then
                Try
                    CommandTextValidator.ValidateStatement("select * from [" & tableName & "] " & paramQuery & " ", StatementTypes.Select)
                    'System.Diagnostics.Debug.WriteLine("Validation worked. The semicolon and statement are inside a text block.")
                    sql = "select * from [" & tableName & "] " & paramQuery & " "
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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetWhereRecordsTop100(ByVal tableType As String, ByVal tableName As String, ByVal paramQuery As String) As String
        'Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        'Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        'Using conn As SqlConnection = New SqlConnection(connstring)
        '    conn.Open()
        '    If tableType = "AllWhereData" Then

        '        sql = "select Top 1000 * from [" & tableName & "] " & paramQuery & " "
        '    End If
        '    Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
        '    Dim ds As DataSet = New DataSet()
        '    ad.Fill(ds)
        '    dt = ds.Tables(0)
        '    conn.Close()
        'End Using
        'Dim tableJson As String = BigConvertDataTabletoString(dt)
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
                    sql = "select * from [" & tableName & "] " & paramQuery & " "
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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetWhereRecords_WA(ByVal tableType As String, ByVal tableName As String, ByVal paramQuery As String) As String
        'Dim connstring As String = ConfigurationManager.ConnectionStrings("WAConnection").ConnectionString
        'Dim dt As DataTable = New DataTable()
        'Dim sql As String = ""
        'Using conn As SqlConnection = New SqlConnection(connstring)
        '    conn.Open()
        '    If tableType = "AllWhereData" Then

        '        sql = "select * from [" & tableName & "] " & paramQuery & " "
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
                    sql = "select * from [" & tableName & "] " & paramQuery & " "
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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertTransactionTrmCategory(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim NameXSS As String = AntiXssEncoder.HtmlEncode(TrxName.Trim, True)
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CategoryID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "INSERT"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCategory"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", NameXSS)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _CategoryID &= sqldr("CategoryID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxCategory '" & UserNameXSS & "','" & NameXSS & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _CategoryID
                objectTickets.TrxmsgSystem = "Data Category Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategory '" & UserNameXSS & "','" & NameXSS & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _CategoryID
                objectTickets.TrxmsgSystem = _CategoryID
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategory '" & UserNameXSS & "','" & NameXSS & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _CategoryID)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateTransactionTrmCategory(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim NameXSS As String = AntiXssEncoder.HtmlEncode(TrxName.Trim, True)
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CategoryID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "UPDATE"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCategory"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", NameXSS)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _CategoryID &= sqldr("CategoryID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxCategory " & ",'" & TrxID & "','" & UserNameXSS & "','" & NameXSS & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _CategoryID
                objectTickets.TrxmsgSystem = "Data Category Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategory " & ",'" & TrxID & "','" & UserNameXSS & "','" & NameXSS & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _CategoryID
                objectTickets.TrxmsgSystem = _CategoryID
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategory " & ",'" & TrxID & "','" & UserNameXSS & "','" & NameXSS & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _CategoryID)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SelectTransactionTrmCategory(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "SELECT"
        Dim NameSP = "Exec UIDESK_TrxCategory"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "','" & TrxName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxCategory", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function TableTransactionTrmChannel(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "Table"
        Dim NameSP = "Exec UIDESK_TrxChannel"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "','" & TrxName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxChannel", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function InsertTransactionTrmChannel(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim AntiXSS As String = AntiXssEncoder.HtmlEncode(TrxName.Trim, True)
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxChannel"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXSS)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxChannel '0','" & AntiXSS & "','" & TrxStatus & "','" & UserNameXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Channel Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxChannel '0','" & AntiXSS & "','" & TrxStatus & "','" & UserNameXSS & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxChannel '0','" & AntiXSS & "','" & TrxStatus & "','" & UserNameXSS & "'"
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
    Public Function UpdateTransactionTrmChannel(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim AntiXSS As String = AntiXssEncoder.HtmlEncode(TrxName.Trim, True)
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Update"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxChannel"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXSS)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxChannel '" & TrxID & "','" & UserNameXSS & "','" & AntiXSS & "','" & TrxStatus & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Channel Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxChannel '" & TrxID & "','" & UserNameXSS & "','" & AntiXSS & "','" & TrxStatus & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxChannel '" & TrxID & "','" & UserNameXSS & "','" & AntiXSS & "','" & TrxStatus & "'"
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
    Public Function DeleteTransactionTrmChannel(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Delete"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxChannel"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", "0")
                sqlComm.Parameters.AddWithValue("TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxChannel '" & TrxID & "','" & UserNameXSS & "','0','0','0'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Channel Has Been Delete"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxChannel '" & TrxID & "','" & UserNameXSS & "','0','0','0'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxChannel '" & TrxID & "','" & UserNameXSS & "','0','0','0'"
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
    Public Function TableTransactionTrmDepartment(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxEmail As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "Table"
        Dim NameSP = "Exec UIDESK_TrxDepartment"
        Dim ExecSP = "" & NameSP & " '" & TrxUserName & "','" & TrxName & "','" & TrxEmail & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxDepartment", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", "-")
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxEmail", TrxEmail)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function InsertTransactionTrmDepartment(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxEmail As String, ByVal TrxStatus As String) As String
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxDepartment"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxEmail", AntiXssEncoder.HtmlEncode(TrxEmail.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxDepartment '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxEmail.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Channel Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxDepartment '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxEmail.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxDepartment '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxEmail.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionTrmDepartment(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxEmail As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Update"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxDepartment"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxEmail", AntiXssEncoder.HtmlEncode(TrxEmail.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxDepartment '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxEmail.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Department Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxDepartment '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxEmail.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxDepartment '" & TrxID & "','" & TrxUserName & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxEmail.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function TableTransactionTrmGroupAgent(ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "TABLE"
        Dim NameSP = "Exec UIDESK_TrxGroupAgent"
        Dim ExecSP = "" & NameSP & " '-','" & TrxUserName & "','0','0','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxGroupAgent", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", "-")
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxName", "0")
                sqlComm.Parameters.AddWithValue("@TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function SelectTransactionTrmGroupAgent(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "SELECT"
        Dim NameSP = "Exec UIDESK_TrxGroupAgent"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "','0','0','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxGroupAgent", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxName", "0")
                sqlComm.Parameters.AddWithValue("@TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function InsertTransactionTrmGroupAgent(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "INSERT"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxGroupAgent"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxGroupAgent '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Channel Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxGroupAgent '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxGroupAgent '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "'"
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
    Public Function UpdateTransactionTrmGroupAgent(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "UPDATE"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxGroupAgent"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxGroupAgent '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Group Agent Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxGroupAgent '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxGroupAgent '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function TableTransactionTrmCsCategory(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "Table"
        Dim NameSP = "Exec UIDESK_TrxCustomerCategory"
        Dim ExecSP = "" & NameSP & " '-','" & TrxUserName & "','" & TrxName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxCustomerCategory", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", "-")
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function SelectTransactionTrmCsCategory(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "Select"
        Dim NameSP = "Exec UIDESK_TrxCustomerCategory"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "','" & TrxName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxCustomerCategory", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function InsertTransactionTrmCsCategory(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCustomerCategory"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxCustomerCategory '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Channel Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCustomerCategory '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCustomerCategory '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionTrmCsCategory(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Update"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCustomerCategory"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxCustomerCategory '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = TrxID
                objectTickets.TrxmsgSystem = "Data Customer Category Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCustomerCategory '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = TrxID
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCustomerCategory '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function DeleteTransactionTrmCsCategory(ByVal TrxID As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Delete"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCustomerCategory"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", "0")
                sqlComm.Parameters.AddWithValue("TrxName", "0")
                sqlComm.Parameters.AddWithValue("TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxCustomerCategory '" & TrxID & "','0','0','0','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxID = TrxID
            objectTickets.TrxmsgSystem = "Data Customer Category Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxCustomerCategory '" & TrxID & "','0','0','0','" & TrxAction & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function TableTransactionTrmCsStatus(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "TABLE"
        Dim NameSP = "Exec UIDESK_TrxCustomerStatus"
        Dim ExecSP = "" & NameSP & " '-','" & TrxUserName & "','" & TrxName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxCustomerStatus", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", "-")
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function InsertTransactionTrmCsStatus(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "INSERT"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCustomerStatus"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxCustomerStatus '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Customer Status Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCustomerStatus '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Result
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCustomerStatus '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionTrmCsStatus(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "UPDATE"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCustomerStatus"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxCustomerStatus '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Customer Status Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCustomerStatus '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = TrxID
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCustomerStatus '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function TableTransactionTrmStatusTicket(ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "TABLE"
        Dim NameSP = "Exec UIDESK_TrxTicketStatus"
        Dim ExecSP = "" & NameSP & " '-','" & TrxUserName & "','0','0','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxTicketStatus", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", "-")
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxName", "0")
                sqlComm.Parameters.AddWithValue("@TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function InsertTransactionTrmStatusTicket(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "INSERT"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxTicketStatus"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxTicketStatus '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Ticket Status Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxTicketStatus '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxTicketStatus '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionTrmStatusTicket(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "UPDATE"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxTicketStatus"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)

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
            strExec = "exec UIDESK_TrxTicketStatus '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Ticket Status Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxTicketStatus '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxTicketStatus '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function TableTransactionTrmPriorityScale(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "Table"
        Dim NameSP = "Exec UIDESK_TrxPriorityScale"
        Dim ExecSP = "" & NameSP & " '-','" & TrxUserName & "','" & TrxName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxPriorityScale", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", "-")
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function InsertTransactionTrmPriorityScale(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxPriorityScale"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxPriorityScaleInsert '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Priority Scale Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxPriorityScaleInsert '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxPriorityScaleInsert '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionTrmPriorityScale(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Update"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxPriorityScale"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxPriorityScale '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Priority Scale Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxPriorityScale '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxPriorityScale '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _Valuenya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteTransactionTrmPriorityScale(ByVal TrxID As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Delete"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxPriorityScale"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", "0")
                sqlComm.Parameters.AddWithValue("TrxName", "0")
                sqlComm.Parameters.AddWithValue("TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", "0")
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxPriorityScale '" & TrxID & "','0','0','0','" & TrxAction & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Priority Scale Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxPriorityScale '" & TrxID & "','0','0','0','" & TrxAction & "'"
            LogSuccess(strLogTime, strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function TableTransactionTrmProductType(ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "TABLE"
        Dim NameSP = "Exec UIDESK_TrxProductType"
        Dim ExecSP = "" & NameSP & " '-','" & TrxUserName & "','0','0','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxProductType", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", "-")
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxName", "0")
                sqlComm.Parameters.AddWithValue("@TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function InsertTransactionTrmProductType(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "INSERT"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxProductType"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxProductType '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Product Type Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxProductType '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxProductType '0','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionTrmProductType(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String, ByVal TrxAction As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxProductType"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxProductType '" & TrxID & "','" & TrxUserName & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Product Type Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxProductType '" & TrxID & "','" & TrxUserName & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxProductType '" & TrxID & "','" & TrxUserName & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, _Valuenya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertTransactionTrmTypeComplaint(ByVal TrxUserName As String, ByVal TrxCategory As String, ByVal TrxName As String, ByVal TrxSLA As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxTypeComplaint"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxCategory", TrxCategory)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxSLA", AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
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
            strExec = "exec UIDESK_TrxTypeComplaint '0','" & TrxUserName & "','" & TrxCategory & "','" & TrxName & "','" & TrxSLA & "','" & TrxStatus & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Type Complaint Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxTypeComplaint '0','" & TrxUserName & "','" & TrxCategory & "','" & TrxName & "','" & TrxSLA & "','" & TrxStatus & "'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxTypeComplaint '0','" & TrxUserName & "','" & TrxCategory & "','" & TrxName & "','" & TrxSLA & "','" & TrxStatus & "'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, _Valuenya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateTransactionTrmTypeComplaint(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxCategory As String, ByVal TrxName As String, ByVal TrxSLA As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxTypeComplaint"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxCategory", TrxCategory)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxSLA", AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
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
            strExec = "exec UIDESK_TrxTypeComplaint '" & TrxID & "','" & TrxUserName & "','" & TrxCategory & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True) & "','" & TrxStatus & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Type Complaint Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxTypeComplaint '" & TrxID & "','" & TrxUserName & "','" & TrxCategory & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True) & "','" & TrxStatus & "'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxTypeComplaint '" & TrxID & "','" & TrxUserName & "','" & TrxCategory & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True) & "','" & TrxStatus & "'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, _Valuenya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function TableTransactionTrmCategoryType(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "TABLE"
        Dim NameSP = "Exec UIDESK_TrxCategoryType"
        Dim ExecSP = "" & NameSP & " '-','0','" & TrxUserName & "','" & TrxName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxCategoryType", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxCategoryID", "0")
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function SelectedTransactionTrmCategoryType(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "SELECT"
        Dim NameSP = "Exec UIDESK_TrxCategoryType"
        Dim ExecSP = "" & NameSP & " '0','0','" & TrxUserName & "','" & TrxName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxCategoryType", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxCategoryID", "0")
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function OnChangeTransactionTrmCategoryType(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "CHANGE"
        Dim NameSP = "Exec UIDESK_TrxCategoryType"
        Dim ExecSP = "" & NameSP & " '0','0','" & TrxUserName & "','" & TrxName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxCategoryType", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxCategoryID", "0")
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function InsertTransactionTrmCategoryType(ByVal TrxCategoryID As String, ByVal TrxName As String,
                                                     ByVal TrxStatus As String, ByVal TrxUserName As String) As String

        Dim AntiXSS As String = AntiXssEncoder.HtmlEncode(TrxName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "INSERT"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCategoryType"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxCategoryID", TrxCategoryID)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXSS)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxCategoryType " & ",'" & TrxCategoryID & "','" & AntiXSS & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Category Type Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategoryType " & ",'" & TrxCategoryID & "','" & AntiXSS & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategoryType " & ",'" & TrxCategoryID & "','" & AntiXSS & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionTrmCategoryType(ByVal TrxID As String, ByVal TrxCategoryID As String, ByVal TrxName As String,
                                                     ByVal TrxStatus As String, ByVal TrxUserName As String) As String
        Dim AntiXSS As String = AntiXssEncoder.HtmlEncode(TrxName.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "UPDATE"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCategoryType"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxCategoryID", TrxCategoryID)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXSS)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxCategoryType    '" & TrxID & "','" & TrxCategoryID & "','" & AntiXSS & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Category Type Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategoryType    '" & TrxID & "','" & TrxCategoryID & "','" & AntiXSS & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategoryType '" & TrxID & "','" & TrxCategoryID & "','" & AntiXSS & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "'"
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
    Public Function TableTransactionTrmCategoryDetail(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "TABLE"
        Dim NameSP = "Exec UIDESK_TrxCategoryDetail"
        Dim ExecSP = "" & NameSP & " '-','0','0','" & TrxUserName & "','" & TrxName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxCategoryDetail", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxCategoryID", "0")
                sqlComm.Parameters.AddWithValue("@TrxSubCategory1ID", "0")
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function SelectedTransactionTrmCategoryDetail(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "SELECT"
        Dim NameSP = "Exec UIDESK_TrxCategoryDetail"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','0','0','" & TrxUserName & "','" & TrxName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxCategoryDetail", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxCategoryID", "0")
                sqlComm.Parameters.AddWithValue("@TrxSubCategory1ID", "0")
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function InsertTransactionTrmCategoryDetail(ByVal TrxCategoryID As String, ByVal TrxSubCategory1ID As String, ByVal TrxName As String,
                                                     ByVal TrxStatus As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "INSERT"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCategoryDetail"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxCategoryID", TrxCategoryID)
                sqlComm.Parameters.AddWithValue("TrxSubCategory1ID", TrxSubCategory1ID)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxCategoryDetail '0','" & TrxCategoryID & "','" & TrxSubCategory1ID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Category Detail Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategoryDetail '0','" & TrxCategoryID & "','" & TrxSubCategory1ID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategoryDetail '0','" & TrxCategoryID & "','" & TrxSubCategory1ID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionTrmCategoryDetail(ByVal TrxID As String, ByVal TrxCategoryID As String, ByVal TrxSubCategory1ID As String, ByVal TrxName As String,
                                                     ByVal TrxStatus As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "UPDATE"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCategoryDetail"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxCategoryID", TrxCategoryID)
                sqlComm.Parameters.AddWithValue("TrxSubCategory1ID", TrxSubCategory1ID)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrmCategoryDetail '" & TrxID & "','" & TrxCategoryID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & UserNameXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Category Detail Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrmCategoryDetail '" & TrxID & "','" & TrxCategoryID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & UserNameXSS & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrmCategoryDetail '" & TrxID & "','" & TrxCategoryID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxStatus & "','" & UserNameXSS & "'"
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
    Public Function OnChangeTransactionTrmCategoryDetail(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "CHANGE"
        Dim NameSP = "Exec UIDESK_TrxCategoryDetail"
        Dim ExecSP = "" & NameSP & " '0','0','" & TrxUserName & "','" & TrxName & "','" & TrxStatus & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxCategoryDetail", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxCategoryID", "0")
                sqlComm.Parameters.AddWithValue("@TrxSubCategory1ID", "0")
                sqlComm.Parameters.AddWithValue("@TrxName", TrxName)
                sqlComm.Parameters.AddWithValue("@TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function TableTransactionTrmCategoryReason(ByVal TrxID As String, ByVal TrxCategoryID As String, ByVal TrxSubCategory1ID As String, ByVal TrxSubCategory2ID As String, ByVal TrxName As String,
                                                     ByVal TrxEscalationUnit As String, ByVal TrxLayer As String, ByVal TrxSLA As String, ByVal TrxStatus As String, ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "TABLE"
        Dim NameSP = "Exec UIDESK_TrxCategoryReason"
        Dim ExecSP = "" & NameSP & " '-','0','0','0','" & TrxName & "','" & TrxEscalationUnit & "','" & TrxLayer & "','" & TrxSLA & "','" & TrxStatus & "','" & TrxUserName & "','" & TrxAction & "','0','0','0'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxCategoryReason", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", "-")
                sqlComm.Parameters.AddWithValue("@TrxCategoryID", "0")
                sqlComm.Parameters.AddWithValue("@TrxSubCategory1ID", "0")
                sqlComm.Parameters.AddWithValue("@TrxSubCategory2ID", "0")
                sqlComm.Parameters.AddWithValue("@TrxName", "0")
                sqlComm.Parameters.AddWithValue("@TrxEscalationUnit", "0")
                sqlComm.Parameters.AddWithValue("@TrxLayer", "0")
                sqlComm.Parameters.AddWithValue("@TrxSLA", "0")
                sqlComm.Parameters.AddWithValue("@TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                sqlComm.Parameters.AddWithValue("@TrxReasonCode", "0")
                sqlComm.Parameters.AddWithValue("@TrxEscalationTicket", "0")
                sqlComm.Parameters.AddWithValue("@TrxPriority", "0")
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
    Public Function SelectTransactionTrmCategoryReason(ByVal TrxID As String, ByVal TrxCategoryID As String, ByVal TrxSubCategory1ID As String, ByVal TrxSubCategory2ID As String, ByVal TrxName As String,
                                                     ByVal TrxEscalationUnit As String, ByVal TrxLayer As String, ByVal TrxSLA As String, ByVal TrxStatus As String, ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "SELECT"
        Dim NameSP = "Exec UIDESK_TrxCategoryReason"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','0','0','0','" & TrxName & "','" & TrxEscalationUnit & "','" & TrxLayer & "','" & TrxSLA & "','" & TrxStatus & "','" & TrxUserName & "','" & TrxAction & "','0','0','0'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxCategoryReason", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxCategoryID", "0")
                sqlComm.Parameters.AddWithValue("@TrxSubCategory1ID", "0")
                sqlComm.Parameters.AddWithValue("@TrxSubCategory2ID", "0")
                sqlComm.Parameters.AddWithValue("@TrxName", "0")
                sqlComm.Parameters.AddWithValue("@TrxEscalationUnit", "0")
                sqlComm.Parameters.AddWithValue("@TrxLayer", "0")
                sqlComm.Parameters.AddWithValue("@TrxSLA", "0")
                sqlComm.Parameters.AddWithValue("@TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                sqlComm.Parameters.AddWithValue("TrxReasonCode", "0")
                sqlComm.Parameters.AddWithValue("TrxEscalationTicket", "0")
                sqlComm.Parameters.AddWithValue("TrxPriority", "0")
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
    Public Function InsertTransactionTrmCategoryReason(ByVal TrxCategoryID As String, ByVal TrxSubCategory1ID As String, ByVal TrxSubCategory2ID As String, ByVal TrxName As String,
                                                     ByVal TrxEscalationUnit As String, ByVal TrxLayer As String, ByVal TrxSLA As String, ByVal TrxStatus As String,
                                                       ByVal TrxUserName As String, ByVal TrxReasonCode As String, ByVal TrxEscalationTicket As String, ByVal TrxPriority As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "INSERT"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCategoryReason"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxCategoryID", TrxCategoryID)
                sqlComm.Parameters.AddWithValue("TrxSubCategory1ID", TrxSubCategory1ID)
                sqlComm.Parameters.AddWithValue("TrxSubCategory2ID", TrxSubCategory2ID)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxEscalationUnit", TrxEscalationUnit)
                sqlComm.Parameters.AddWithValue("TrxLayer", TrxLayer)
                sqlComm.Parameters.AddWithValue("TrxSLA", AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
                sqlComm.Parameters.AddWithValue("TrxReasonCode", TrxReasonCode)
                sqlComm.Parameters.AddWithValue("TrxEscalationTicket", TrxEscalationTicket)
                sqlComm.Parameters.AddWithValue("TrxPriority", TrxPriority)
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
            strExec = "exec UIDESK_TrxCategoryReason '0','" & TrxCategoryID & "','" & TrxSubCategory1ID & "','" & TrxSubCategory2ID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxEscalationUnit & "','" & TrxLayer & "','" & AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True) & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "','" & TrxReasonCode & "','" & TrxEscalationTicket & "','" & TrxPriority & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Category Reason Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategoryReason '0','" & TrxCategoryID & "','" & TrxSubCategory1ID & "','" & TrxSubCategory2ID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxEscalationUnit & "','" & TrxLayer & "','" & AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True) & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "','" & TrxReasonCode & "','" & TrxEscalationTicket & "','" & TrxPriority & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategoryReason '0','" & TrxCategoryID & "','" & TrxSubCategory1ID & "','" & TrxSubCategory2ID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxEscalationUnit & "','" & TrxLayer & "','" & AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True) & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "','" & TrxReasonCode & "','" & TrxEscalationTicket & "','" & TrxPriority & "'"
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
    Public Function UpdateTransactionTrmCategoryReason(ByVal TrxID As String, ByVal TrxCategoryID As String, ByVal TrxSubCategory1ID As String,
                                                       ByVal TrxSubCategory2ID As String, ByVal TrxName As String, ByVal TrxEscalationUnit As String,
                                                       ByVal TrxLayer As String, ByVal TrxSLA As String, ByVal TrxStatus As String, ByVal TrxUserName As String,
                                                       ByVal TrxReasonCode As String, ByVal TrxEscalationTicket As String, ByVal TrxPriority As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "UPDATE"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCategoryReason"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxCategoryID", TrxCategoryID)
                sqlComm.Parameters.AddWithValue("TrxSubCategory1ID", TrxSubCategory1ID)
                sqlComm.Parameters.AddWithValue("TrxSubCategory2ID", TrxSubCategory2ID)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxEscalationUnit", TrxEscalationUnit)
                sqlComm.Parameters.AddWithValue("TrxLayer", TrxLayer)
                sqlComm.Parameters.AddWithValue("TrxSLA", AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
                sqlComm.Parameters.AddWithValue("TrxReasonCode", TrxReasonCode)
                sqlComm.Parameters.AddWithValue("TrxEscalationTicket", TrxEscalationTicket)
                sqlComm.Parameters.AddWithValue("TrxPriority", TrxPriority)
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
            strExec = "exec UIDESK_TrxCategoryReason '" & TrxID & "','" & TrxCategoryID & "','" & TrxSubCategory1ID & "','" & TrxSubCategory2ID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxEscalationUnit & "','" & TrxLayer & "','" & AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True) & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "',,'" & TrxReasonCode & "','" & TrxEscalationTicket & "','" & TrxPriority & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Category Reason Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategoryReason '" & TrxID & "','" & TrxCategoryID & "','" & TrxSubCategory1ID & "','" & TrxSubCategory2ID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxEscalationUnit & "','" & TrxLayer & "','" & AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True) & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "',,'" & TrxReasonCode & "','" & TrxEscalationTicket & "','" & TrxPriority & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCategoryReason '" & TrxID & "','" & TrxCategoryID & "','" & TrxSubCategory1ID & "','" & TrxSubCategory2ID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxEscalationUnit & "','" & TrxLayer & "','" & AntiXssEncoder.HtmlEncode(TrxSLA.Trim, True) & "','" & TrxStatus & "','" & UserNameXSS & "','" & TrxAction & "',,'" & TrxReasonCode & "','" & TrxEscalationTicket & "','" & TrxPriority & "'"
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
    Public Function TableTransactionTrmSettingUser(ByVal LevelUserID As String, ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim TrxAction As String = "Table"
        Dim NameSP = "Exec UIDESK_TrxSettingManagement"
        Dim ExecSP = "" & NameSP & " '0','0','0','0','0','" & TrxUserName & "','" & LevelUserID & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxSettingManagement", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", "0")
                sqlComm.Parameters.AddWithValue("@TrxMenuID", "0")
                sqlComm.Parameters.AddWithValue("@TrxSubMenuID", "0")
                sqlComm.Parameters.AddWithValue("@TrxTreeMenuID", "0")
                sqlComm.Parameters.AddWithValue("@TrxDescription", "0")
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxLevelUserID", LevelUserID)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function InsertTransactionTrmSettingUser(ByVal TrxMenuID As String, ByVal TrxSubMenuID As String, ByVal TrxTreeMenuID As String, ByVal TrxDescription As String,
                                                     ByVal TrxUserName As String, ByVal TrxLevelUserID As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxSettingManagement"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxMenuID", TrxMenuID)
                sqlComm.Parameters.AddWithValue("TrxSubMenuID", TrxSubMenuID)
                sqlComm.Parameters.AddWithValue("TrxTreeMenuID", TrxTreeMenuID)
                sqlComm.Parameters.AddWithValue("TrxDescription", AntiXssEncoder.HtmlEncode(TrxDescription.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxLevelUserID", TrxLevelUserID)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxSettingManagement '0','" & TrxMenuID & "','" & TrxSubMenuID & "','" & TrxTreeMenuID & "','" & AntiXssEncoder.HtmlEncode(TrxDescription.Trim, True) & "','" & UserNameXSS & "','" & TrxLevelUserID & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Setting User Management Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxSettingManagement '0','" & TrxMenuID & "','" & TrxSubMenuID & "','" & TrxTreeMenuID & "','" & AntiXssEncoder.HtmlEncode(TrxDescription.Trim, True) & "','" & UserNameXSS & "','" & TrxLevelUserID & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxSettingManagement '0','" & TrxMenuID & "','" & TrxSubMenuID & "','" & TrxTreeMenuID & "','" & AntiXssEncoder.HtmlEncode(TrxDescription.Trim, True) & "','" & UserNameXSS & "','" & TrxLevelUserID & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionTrmSettingUser(ByVal TrxID As String, ByVal TrxDescription As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Update"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxSettingManagement"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxMenuID", "0")
                sqlComm.Parameters.AddWithValue("TrxSubMenuID", "0")
                sqlComm.Parameters.AddWithValue("TrxTreeMenuID", "0")
                sqlComm.Parameters.AddWithValue("TrxDescription", AntiXssEncoder.HtmlEncode(TrxDescription.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxLevelUserID", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxSettingManagement '" & TrxID & "','0','0','0','" & AntiXssEncoder.HtmlEncode(TrxDescription.Trim, True) & "','" & UserNameXSS & "','0','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Setting User Management Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxSettingManagement '" & TrxID & "','0','0','0','" & AntiXssEncoder.HtmlEncode(TrxDescription.Trim, True) & "','" & UserNameXSS & "','0','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxSettingManagement '" & TrxID & "','0','0','0','" & AntiXssEncoder.HtmlEncode(TrxDescription.Trim, True) & "','" & UserNameXSS & "','0','" & TrxAction & "'"
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
    Public Function DeleteTransactionTrmSettingUser(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Delete"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxSettingManagement"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxMenuID", "0")
                sqlComm.Parameters.AddWithValue("TrxSubMenuID", "0")
                sqlComm.Parameters.AddWithValue("TrxTreeMenuID", "0")
                sqlComm.Parameters.AddWithValue("TrxDescription", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxLevelUserID", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxSettingManagement '" & TrxID & "','0','0','0','0','" & UserNameXSS & "','0','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Setting User Management Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxSettingManagement '" & TrxID & "','0','0','0','0','" & UserNameXSS & "','0','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxSettingManagement '" & TrxID & "','0','0','0','0','" & UserNameXSS & "','0','" & TrxAction & "'"
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
    Public Function InsertTransactionUserApplication(ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxEmail As String, ByVal TrxPassword As String,
                                                     ByVal TrxLevelUser As String, ByVal TrxDepartment As String, ByVal TrxGroupAgent As String, ByVal TrxSite As String,
                                                     ByVal TrxDescription As String, ByVal TrxStatus As String, ByVal TrxUserCreate As String,
                                                     ByVal TrxChannelEmail As String, ByVal TrxChannelWA As String, ByVal TrxChannelInbound As String, ByVal TrxChannelOutbound As String,
                                                     ByVal TrxChannelInstagram As String, ByVal TrxChannelFacebook As String,
                                                     ByVal TrxChannelTwitter As String, ByVal TrxTokenMeta As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty

        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxNameXSS As String = AntiXssEncoder.HtmlEncode(TrxName.Trim, True)

        Dim TrxAction As String = "Insert"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUser"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", TrxNameXSS)
                sqlComm.Parameters.AddWithValue("TrxEmail", TrxEmail)
                sqlComm.Parameters.AddWithValue("TrxPassword", TrxPassword)
                sqlComm.Parameters.AddWithValue("TrxLevelUser", TrxLevelUser)
                sqlComm.Parameters.AddWithValue("TrxDepartment", TrxDepartment)
                sqlComm.Parameters.AddWithValue("TrxGroupAgent", TrxGroupAgent)
                sqlComm.Parameters.AddWithValue("TrxSite", TrxSite)
                sqlComm.Parameters.AddWithValue("TrxDescription", TrxDescription)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUserCreate", TrxUserCreate)
                sqlComm.Parameters.AddWithValue("TrxChannelEmail", TrxChannelEmail)
                sqlComm.Parameters.AddWithValue("TrxChannelWA", TrxChannelWA)
                sqlComm.Parameters.AddWithValue("TrxChannelInbound", TrxChannelInbound)
                sqlComm.Parameters.AddWithValue("TrxChannelOutbound", TrxChannelOutbound)
                sqlComm.Parameters.AddWithValue("TrxChannelInstagram", TrxChannelInstagram)
                sqlComm.Parameters.AddWithValue("TrxChannelFacebook", TrxChannelFacebook)
                sqlComm.Parameters.AddWithValue("TrxChannelTwitter", TrxChannelTwitter)
                sqlComm.Parameters.AddWithValue("TrxTokenMeta", TrxTokenMeta)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxUser '0','" & TrxUserNameXSS & "','" & TrxNameXSS & "','" & TrxEmail & "','" & TrxPassword & "','" & TrxLevelUser & "','" & TrxDepartment & "','" & TrxGroupAgent & "','" & TrxSite & "','" & TrxDescription & "','" & TrxStatus & "','" & TrxUserCreate & "','" & TrxChannelEmail & "','" & TrxChannelWA & "','" & TrxChannelInbound & "','" & TrxChannelOutbound & "','" & TrxChannelInstagram & "','" & TrxChannelFacebook & "','" & TrxChannelTwitter & "','" & TrxTokenMeta & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data User Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxUser '0','" & TrxUserNameXSS & "','" & TrxNameXSS & "','" & TrxEmail & "','" & TrxPassword & "','" & TrxLevelUser & "','" & TrxDepartment & "','" & TrxGroupAgent & "','" & TrxSite & "','" & TrxDescription & "','" & TrxStatus & "','" & TrxUserCreate & "','" & TrxChannelEmail & "','" & TrxChannelWA & "','" & TrxChannelInbound & "','" & TrxChannelOutbound & "','" & TrxChannelInstagram & "','" & TrxChannelFacebook & "','" & TrxChannelTwitter & "','" & TrxTokenMeta & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxUser '0','" & TrxUserNameXSS & "','" & TrxNameXSS & "','" & TrxEmail & "','" & TrxPassword & "','" & TrxLevelUser & "','" & TrxDepartment & "','" & TrxGroupAgent & "','" & TrxSite & "','" & TrxDescription & "','" & TrxStatus & "','" & TrxUserCreate & "','" & TrxChannelEmail & "','" & TrxChannelWA & "','" & TrxChannelInbound & "','" & TrxChannelOutbound & "','" & TrxChannelInstagram & "','" & TrxChannelFacebook & "','" & TrxChannelTwitter & "','" & TrxTokenMeta & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionUserApplication(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxName As String, ByVal TrxEmail As String, ByVal TrxPassword As String,
                                                     ByVal TrxLevelUser As String, ByVal TrxDepartment As String, ByVal TrxGroupAgent As String,
                                                     ByVal TrxSite As String, ByVal TrxDescription As String, ByVal TrxStatus As String, ByVal TrxUserCreate As String,
                                                     ByVal TrxChannelEmail As String, ByVal TrxChannelWA As String, ByVal TrxChannelInbound As String,
                                                     ByVal TrxChannelOutbound As String, ByVal TrxChannelInstagram As String, ByVal TrxChannelFacebook As String,
                                                     ByVal TrxChannelTwitter As String, ByVal TrxTokenMeta As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Update"
        Dim TrxGroupAgentValue As String = ""
        Dim TrxDepartmentValue As String = ""
        Dim TrxDescriptionValue As String = ""
        If TrxGroupAgent = "" Then
            TrxGroupAgentValue = "0"
        Else
            TrxGroupAgentValue = TrxGroupAgent
        End If
        If TrxDepartment = "" Then
            TrxDepartmentValue = "0"
        Else
            TrxDepartmentValue = TrxDepartment
        End If
        If TrxDescription = "" Then
            TrxDescriptionValue = "0"
        Else
            TrxDescriptionValue = TrxDescription
        End If
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUser"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxEmail", TrxEmail)
                sqlComm.Parameters.AddWithValue("TrxPassword", TrxPassword)
                sqlComm.Parameters.AddWithValue("TrxLevelUser", TrxLevelUser)
                sqlComm.Parameters.AddWithValue("TrxDepartment", TrxDepartmentValue)
                sqlComm.Parameters.AddWithValue("TrxGroupAgent", TrxGroupAgentValue)
                sqlComm.Parameters.AddWithValue("TrxSite", TrxSite)
                sqlComm.Parameters.AddWithValue("TrxDescription", TrxDescriptionValue)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUserCreate", TrxUserCreate)
                sqlComm.Parameters.AddWithValue("TrxChannelEmail", TrxChannelEmail)
                sqlComm.Parameters.AddWithValue("TrxChannelWA", TrxChannelWA)
                sqlComm.Parameters.AddWithValue("TrxChannelInbound", TrxChannelInbound)
                sqlComm.Parameters.AddWithValue("TrxChannelOutbound", TrxChannelOutbound)
                sqlComm.Parameters.AddWithValue("TrxChannelInstagram", TrxChannelInstagram)
                sqlComm.Parameters.AddWithValue("TrxChannelFacebook", TrxChannelFacebook)
                sqlComm.Parameters.AddWithValue("TrxChannelTwitter", TrxChannelTwitter)
                sqlComm.Parameters.AddWithValue("TrxTokenMeta", TrxTokenMeta)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxUser '" & TrxID & "','" & AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxEmail & "','" & TrxPassword & "','" & TrxLevelUser & "','" & TrxDepartment & "','" & TrxGroupAgent & "','" & TrxDescriptionValue & "','" & TrxStatus & "','" & TrxUserCreate & "','" & TrxChannelEmail & "','" & TrxChannelWA & "','" & TrxChannelInbound & "','" & TrxChannelOutbound & "','" & TrxChannelInstagram & "','" & TrxChannelFacebook & "','" & TrxChannelTwitter & "','" & TrxTokenMeta & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data User Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxUser '" & TrxID & "','" & AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxEmail & "','" & TrxPassword & "','" & TrxLevelUser & "','" & TrxDepartment & "','" & TrxGroupAgent & "','" & TrxDescriptionValue & "','" & TrxStatus & "','" & TrxUserCreate & "','" & TrxChannelEmail & "','" & TrxChannelWA & "','" & TrxChannelInbound & "','" & TrxChannelOutbound & "','" & TrxChannelInstagram & "','" & TrxChannelFacebook & "','" & TrxChannelTwitter & "','" & TrxTokenMeta & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxUser '" & TrxID & "','" & AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & TrxEmail & "','" & TrxPassword & "','" & TrxLevelUser & "','" & TrxDepartment & "','" & TrxGroupAgent & "','" & TrxDescriptionValue & "','" & TrxStatus & "','" & TrxUserCreate & "','" & TrxChannelEmail & "','" & TrxChannelWA & "','" & TrxChannelInbound & "','" & TrxChannelOutbound & "','" & TrxChannelInstagram & "','" & TrxChannelFacebook & "','" & TrxChannelTwitter & "','" & TrxTokenMeta & "','" & TrxAction & "'"
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
    Public Function DeleteTransactionUserApplication(ByVal TrxID As String, ByVal TrxUserCreate As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Delete"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUser"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", "0")
                sqlComm.Parameters.AddWithValue("TrxName", "0")
                sqlComm.Parameters.AddWithValue("TrxEmail", "0")
                sqlComm.Parameters.AddWithValue("TrxPassword", "0")
                sqlComm.Parameters.AddWithValue("TrxLevelUser", "0")
                sqlComm.Parameters.AddWithValue("TrxDepartment", "0")
                sqlComm.Parameters.AddWithValue("TrxGroupAgent", "0")
                sqlComm.Parameters.AddWithValue("TrxDescription", "0")
                sqlComm.Parameters.AddWithValue("TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("TrxUserCreate", TrxUserCreate)
                sqlComm.Parameters.AddWithValue("TrxChannelEmail", "0")
                sqlComm.Parameters.AddWithValue("TrxChannelWA", "0")
                sqlComm.Parameters.AddWithValue("TrxChannelSMS", "0")
                sqlComm.Parameters.AddWithValue("TrxChannelInbound", "0")
                sqlComm.Parameters.AddWithValue("TrxChannelOutbound", "0")
                sqlComm.Parameters.AddWithValue("TrxChannelInstagram", "0")
                sqlComm.Parameters.AddWithValue("TrxChannelFacebook", "0")
                sqlComm.Parameters.AddWithValue("TrxChannelTwitter", "0")
                sqlComm.Parameters.AddWithValue("TrxChannelChat", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxUser '" & TrxID & "','" & TrxUserCreate & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data User Has Been Delete"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxUser '" & TrxID & "','" & TrxUserCreate & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxUser '" & TrxID & "','" & TrxUserCreate & "','" & TrxAction & "'"
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
    Public Function InsertTransactionTrmCampaign(ByVal TrxUserName As String, ByVal TrxCampaignName As String, ByVal TrxCampaignChannel As String,
                                                 ByVal TrxCampaignDescription As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaign"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxCampaignName", AntiXssEncoder.HtmlEncode(TrxCampaignName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxCampaignChannel", AntiXssEncoder.HtmlEncode(TrxCampaignChannel.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxCampaignDescription", AntiXssEncoder.HtmlEncode(TrxCampaignDescription.Trim, True))
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
            strExec = "exec UIDESK_TrxCampaign '0','" & TrxCampaignName & "','" & TrxCampaignChannel & "','" & TrxCampaignDescription & "','" & TrxStatus & "','" & UserNameXSS & "','Insert'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaign '0','" & TrxCampaignName & "','" & TrxCampaignChannel & "','" & TrxCampaignDescription & "','" & TrxStatus & "','" & UserNameXSS & "','Insert'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaign '0','" & TrxCampaignName & "','" & TrxCampaignChannel & "','" & TrxCampaignDescription & "','" & TrxStatus & "','" & UserNameXSS & "','Insert'"
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
    Public Function UpdateTransactionTrmCampaign(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxCampaignName As String, ByVal TrxCampaignChannel As String,
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
                sqlComm.Parameters.AddWithValue("TrxCampaignName", AntiXssEncoder.HtmlEncode(TrxCampaignName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxCampaignChannel", AntiXssEncoder.HtmlEncode(TrxCampaignChannel.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxCampaignDescription", AntiXssEncoder.HtmlEncode(TrxCampaignDescription.Trim, True))
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
            strExec = "exec UIDESK_TrxCampaign '" & TrxID & "','" & TrxCampaignName & "','" & TrxCampaignDescription & "','" & TrxCampaignChannel & "','" & TrxStatus & "','" & TrxUserName & "','Update'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaign '" & TrxID & "','" & TrxCampaignName & "','" & TrxCampaignDescription & "','" & TrxCampaignChannel & "','" & TrxStatus & "','" & TrxUserName & "','Update'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaign '" & TrxID & "','" & TrxCampaignName & "','" & TrxCampaignDescription & "','" & TrxCampaignChannel & "','" & TrxStatus & "','" & TrxUserName & "','Update'"
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
    Public Function DeleteTransactionTrmCampaign(ByVal TrxID As String, ByVal TrxUserName As String) As String
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
            strExec = "exec UIDESK_TrxCampaign '" & TrxID & "','" & TrxUserName & "','Delete'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Has Been Delete"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaign '" & TrxID & "','" & TrxUserName & "','Delete'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaign '" & TrxID & "','" & TrxUserName & "','Delete'"
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
    Public Function InsertTransactionTrmCampaignScript(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxCampaignScript As String, ByVal TrxCampaignScriptHeader As String,
                                                 ByVal TrxCampaignScriptContent As String, ByVal TrxCampaignScriptFooter As String,
                                                 ByVal TrxChannel As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaignScript"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxCampaignScript", TrxCampaignScript)
                sqlComm.Parameters.AddWithValue("TrxCampaignScriptHeader", HttpUtility.UrlDecode(TrxCampaignScriptHeader))
                sqlComm.Parameters.AddWithValue("TrxCampaignScriptContent", HttpUtility.UrlDecode(TrxCampaignScriptContent))
                sqlComm.Parameters.AddWithValue("TrxCampaignScriptFooter", HttpUtility.UrlDecode(TrxCampaignScriptFooter))
                sqlComm.Parameters.AddWithValue("TrxChannel", TrxChannel)
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
            strExec = "exec UIDESK_TrxCampaignScript '" & TrxID & "','" & TrxUserName & "','" & TrxCampaignScript & "','" & HttpUtility.UrlDecode(TrxCampaignScriptHeader) & "','" & HttpUtility.UrlDecode(TrxCampaignScriptContent) & "','" & HttpUtility.UrlDecode(TrxCampaignScriptFooter) & "','" & TrxChannel & "','" & TrxStatus & "','Insert'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Script Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignScript '" & TrxID & "','" & TrxUserName & "','" & TrxCampaignScript & "','" & HttpUtility.UrlDecode(TrxCampaignScriptHeader) & "','" & HttpUtility.UrlDecode(TrxCampaignScriptContent) & "','" & HttpUtility.UrlDecode(TrxCampaignScriptFooter) & "','" & TrxChannel & "','" & TrxStatus & "','Insert'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignScript '" & TrxID & "','" & TrxUserName & "','" & TrxCampaignScript & "','" & HttpUtility.UrlDecode(TrxCampaignScriptHeader) & "','" & HttpUtility.UrlDecode(TrxCampaignScriptContent) & "','" & HttpUtility.UrlDecode(TrxCampaignScriptFooter) & "','" & TrxChannel & "','" & TrxStatus & "','Insert'"
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
    Public Function UpdateTransactionTrmCampaignScript(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxCampaignScript As String, ByVal TrxCampaignScriptHeader As String,
                                                 ByVal TrxCampaignScriptContent As String, ByVal TrxCampaignScriptFooter As String,
                                                 ByVal TrxChannel As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaignScript"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxCampaignScript", TrxCampaignScript)
                sqlComm.Parameters.AddWithValue("TrxCampaignScriptHeader", HttpUtility.UrlDecode(TrxCampaignScriptHeader))
                sqlComm.Parameters.AddWithValue("TrxCampaignScriptContent", HttpUtility.UrlDecode(TrxCampaignScriptContent))
                sqlComm.Parameters.AddWithValue("TrxCampaignScriptFooter", HttpUtility.UrlDecode(TrxCampaignScriptFooter))
                sqlComm.Parameters.AddWithValue("TrxChannel", TrxChannel)
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
            strExec = "exec UIDESK_TrxCampaignScript '" & TrxID & "','" & TrxUserName & "','" & TrxCampaignScript & "','" & HttpUtility.UrlDecode(TrxCampaignScriptHeader) & "','" & HttpUtility.UrlDecode(TrxCampaignScriptContent) & "','" & HttpUtility.UrlDecode(TrxCampaignScriptFooter) & "','" & TrxChannel & "','" & TrxStatus & "','Update'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Script Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignScript '" & TrxID & "','" & TrxUserName & "','" & TrxCampaignScript & "','" & HttpUtility.UrlDecode(TrxCampaignScriptHeader) & "','" & HttpUtility.UrlDecode(TrxCampaignScriptContent) & "','" & HttpUtility.UrlDecode(TrxCampaignScriptFooter) & "','" & TrxChannel & "','" & TrxStatus & "','Update'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignScript '" & TrxID & "','" & TrxUserName & "','" & TrxCampaignScript & "','" & HttpUtility.UrlDecode(TrxCampaignScriptHeader) & "','" & HttpUtility.UrlDecode(TrxCampaignScriptContent) & "','" & HttpUtility.UrlDecode(TrxCampaignScriptFooter) & "','" & TrxChannel & "','" & TrxStatus & "','Update'"
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
    Public Function DeleteTransactionTrmCampaignScript(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaignScript"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxCampaignScript", "0")
                sqlComm.Parameters.AddWithValue("TrxCampaignScriptHeader", "0")
                sqlComm.Parameters.AddWithValue("TrxCampaignScriptContent", "0")
                sqlComm.Parameters.AddWithValue("TrxCampaignScriptFooter", "0")
                sqlComm.Parameters.AddWithValue("TrxChannel", "0")
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
            strExec = "exec UIDESK_TrxCampaignScript '" & TrxID & "','" & TrxUserName & "','0','0','0','0','0,'0','Delete'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Script Has Been Delete"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignScript '" & TrxID & "','" & TrxUserName & "','0','0','0','0','0,'0','Delete'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignScript '" & TrxID & "','" & TrxUserName & "','0','0','0','0','0,'0','Delete'"
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
    Public Function InsertTransactionTrmCampaignContent(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxTemplateName As String, ByVal TrxMessageBlast As String, ByVal TrxUrlBlast As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaignContent"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxTemplateName", TrxTemplateName)
                sqlComm.Parameters.AddWithValue("TrxMessageBlast", HttpUtility.UrlDecode(TrxMessageBlast))
                sqlComm.Parameters.AddWithValue("TrxUrlBlast", HttpUtility.UrlDecode(TrxUrlBlast))
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
            strExec = "exec UIDESK_TrxCampaignContent '" & TrxID & "','" & TrxUserName & "','" & TrxTemplateName & "','" & HttpUtility.UrlDecode(TrxMessageBlast) & "','" & HttpUtility.UrlDecode(TrxUrlBlast) & "','Insert'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Script Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignContent '" & TrxID & "','" & TrxUserName & "','" & TrxTemplateName & "','" & HttpUtility.UrlDecode(TrxMessageBlast) & "','" & HttpUtility.UrlDecode(TrxUrlBlast) & "','Insert'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignContent '" & TrxID & "','" & TrxUserName & "','" & TrxTemplateName & "','" & HttpUtility.UrlDecode(TrxMessageBlast) & "','" & HttpUtility.UrlDecode(TrxUrlBlast) & "','Insert'"
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
    Public Function UpdateTransactionTrmCampaignContent(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxTemplateName As String, ByVal TrxMessageBlast As String, ByVal TrxUrlBlast As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaignContent"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxTemplateName", TrxTemplateName)
                sqlComm.Parameters.AddWithValue("TrxMessageBlast", HttpUtility.UrlDecode(TrxMessageBlast))
                sqlComm.Parameters.AddWithValue("TrxUrlBlast", HttpUtility.UrlDecode(TrxUrlBlast))
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
            strExec = "exec UIDESK_TrxCampaignContent '" & TrxID & "','" & TrxUserName & "','" & TrxTemplateName & "','" & HttpUtility.UrlDecode(TrxMessageBlast) & "','" & HttpUtility.UrlDecode(TrxUrlBlast) & "','Update'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Script Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignContent '" & TrxID & "','" & TrxUserName & "','" & TrxTemplateName & "','" & HttpUtility.UrlDecode(TrxMessageBlast) & "','" & HttpUtility.UrlDecode(TrxUrlBlast) & "','Update'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignContent '" & TrxID & "','" & TrxUserName & "','" & TrxTemplateName & "','" & HttpUtility.UrlDecode(TrxMessageBlast) & "','" & HttpUtility.UrlDecode(TrxUrlBlast) & "','Update'"
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
    Public Function DeleteTransactionTrmCampaignContent(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCampaignContent"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxTemplateName", "0")
                sqlComm.Parameters.AddWithValue("TrxMessageBlast", "0")
                sqlComm.Parameters.AddWithValue("TrxUrlBlast", "0")
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
            strExec = "exec UIDESK_TrxCampaignContent '" & TrxID & "','" & TrxUserName & "','Delete'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Campaign Script Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignContent '" & TrxID & "','" & TrxUserName & "','Delete'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCampaignContent '" & TrxID & "','" & TrxUserName & "','Delete'"
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
    Public Function InsertTransactionMenuApplication(ByVal TrxName As String, ByVal TrxUrl As String, ByVal TrxNumber As String,
                                                     ByVal TrxIcon As String, ByVal TrxType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxMenuApplication"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxUrl", HttpUtility.UrlDecode(TrxUrl))
                sqlComm.Parameters.AddWithValue("TrxNumber", AntiXssEncoder.HtmlEncode(TrxNumber.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxIcon", AntiXssEncoder.HtmlEncode(TrxIcon.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxMenuApplication '0','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & AntiXssEncoder.HtmlEncode(TrxNumber.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxIcon.Trim, True) & "','" & TrxType & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxMenuApplication '0','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & AntiXssEncoder.HtmlEncode(TrxNumber.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxIcon.Trim, True) & "','" & TrxType & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxMenuApplication '0','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & AntiXssEncoder.HtmlEncode(TrxNumber.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxIcon.Trim, True) & "','" & TrxType & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionMenuApplication(ByVal TrxID As String, ByVal TrxName As String, ByVal TrxUrl As String, ByVal TrxNumber As String,
                                                     ByVal TrxIcon As String, ByVal TrxType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Update"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxMenuApplication"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxName", AntiXssEncoder.HtmlEncode(TrxName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxUrl", HttpUtility.UrlDecode(TrxUrl))
                sqlComm.Parameters.AddWithValue("TrxNumber", AntiXssEncoder.HtmlEncode(TrxNumber.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxIcon", AntiXssEncoder.HtmlEncode(TrxIcon.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxMenuApplication '" & TrxID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & AntiXssEncoder.HtmlEncode(TrxNumber.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxIcon.Trim, True) & "','" & TrxType & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxMenuApplication '" & TrxID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & AntiXssEncoder.HtmlEncode(TrxNumber.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxIcon.Trim, True) & "','" & TrxType & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxMenuApplication '" & TrxID & "','" & AntiXssEncoder.HtmlEncode(TrxName.Trim, True) & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & AntiXssEncoder.HtmlEncode(TrxNumber.Trim, True) & "','" & AntiXssEncoder.HtmlEncode(TrxIcon.Trim, True) & "','" & TrxType & "','" & TrxAction & "'"
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
    Public Function DeleteTransactionMenuApplication(ByVal TrxID As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Delete"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxMenuApplication"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxName", "0")
                sqlComm.Parameters.AddWithValue("TrxUrl", "0")
                sqlComm.Parameters.AddWithValue("TrxNumber", "0")
                sqlComm.Parameters.AddWithValue("TrxIcon", "0")
                sqlComm.Parameters.AddWithValue("TrxType", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxMenuApplication '" & TrxID & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxMenuApplication '" & TrxID & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxMenuApplication '" & TrxID & "','" & TrxAction & "'"
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
    Public Function InsertTransactionSubMenuApplication(ByVal TrxMenuName As String, ByVal TrxSubMenuName As String, ByVal TrxUrl As String, ByVal TrxType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxSubMenuApplication"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxMenuName", TrxMenuName)
                sqlComm.Parameters.AddWithValue("TrxSubMenuName", TrxSubMenuName)
                sqlComm.Parameters.AddWithValue("TrxUrl", HttpUtility.UrlDecode(TrxUrl))
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxSubMenuApplication '0','" & TrxMenuName & "','" & TrxSubMenuName & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & TrxType & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxSubMenuApplication '0','" & TrxMenuName & "','" & TrxSubMenuName & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & TrxType & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxSubMenuApplication '0','" & TrxMenuName & "','" & TrxSubMenuName & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & TrxType & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionSubMenuApplication(ByVal TrxID As String, ByVal TrxSubMenuName As String, ByVal TrxUrl As String, ByVal TrxType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Update"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxSubMenuApplication"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxMenuName", "0")
                sqlComm.Parameters.AddWithValue("TrxSubMenuName", TrxSubMenuName)
                sqlComm.Parameters.AddWithValue("TrxUrl", HttpUtility.UrlDecode(TrxUrl))
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxSubMenuApplication '" & TrxID & "','0','" & TrxSubMenuName & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & TrxType & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxSubMenuApplication '" & TrxID & "','0','" & TrxSubMenuName & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & TrxType & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxSubMenuApplication '" & TrxID & "','0','" & TrxSubMenuName & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & TrxType & "','" & TrxAction & "'"
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
    Public Function DeleteTransactionSubMenuApplication(ByVal TrxID As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Delete"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxSubMenuApplication"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxMenuName", "0")
                sqlComm.Parameters.AddWithValue("TrxSubMenuName", "0")
                sqlComm.Parameters.AddWithValue("TrxUrl", "0")
                sqlComm.Parameters.AddWithValue("TrxType", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxSubMenuApplication '" & TrxID & "','0','0','0','0','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Delete"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxSubMenuApplication '" & TrxID & "','0','0','0','0','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxSubMenuApplication '" & TrxID & "','0','0','0','0','" & TrxAction & "'"
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
    Public Function InsertTransactionDetailMenuApplication(ByVal TrxMenuName As String, ByVal TrxSubMenuName As String, ByVal TrxDetailMenuName As String, ByVal TrxUrl As String, ByVal TrxType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxDetailMenuApplication"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxMenuName", TrxMenuName)
                sqlComm.Parameters.AddWithValue("TrxSubMenuName", TrxSubMenuName)
                sqlComm.Parameters.AddWithValue("TrxDetailMenuName", AntiXssEncoder.HtmlEncode(TrxDetailMenuName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxUrl", HttpUtility.UrlDecode(TrxUrl))
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxDetailMenuApplication '0','" & TrxMenuName & "','" & TrxSubMenuName & "','" & AntiXssEncoder.HtmlEncode(TrxDetailMenuName.Trim, True) & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & TrxType & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxDetailMenuApplication '0','" & TrxMenuName & "','" & TrxSubMenuName & "','" & AntiXssEncoder.HtmlEncode(TrxDetailMenuName.Trim, True) & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & TrxType & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxDetailMenuApplication '0','" & TrxMenuName & "','" & TrxSubMenuName & "','" & AntiXssEncoder.HtmlEncode(TrxDetailMenuName.Trim, True) & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & TrxType & "','" & TrxAction & "'"
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
    Public Function UpdateTransactionDetailMenuApplication(ByVal TrxID As String, ByVal TrxDetailMenuName As String, ByVal TrxUrl As String, ByVal TrxType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Update"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxDetailMenuApplication"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxMenuName", "0")
                sqlComm.Parameters.AddWithValue("TrxSubMenuName", "0")
                sqlComm.Parameters.AddWithValue("TrxDetailMenuName", AntiXssEncoder.HtmlEncode(TrxDetailMenuName.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxUrl", HttpUtility.UrlDecode(TrxUrl))
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxDetailMenuApplication '" & TrxID & "','0','0','" & AntiXssEncoder.HtmlEncode(TrxDetailMenuName.Trim, True) & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & TrxType & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxDetailMenuApplication '" & TrxID & "','0','0','" & AntiXssEncoder.HtmlEncode(TrxDetailMenuName.Trim, True) & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & TrxType & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxDetailMenuApplication '" & TrxID & "','0','0','" & AntiXssEncoder.HtmlEncode(TrxDetailMenuName.Trim, True) & "','" & HttpUtility.UrlDecode(TrxUrl) & "','" & TrxType & "','" & TrxAction & "'"
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
    Public Function DeleteTransactionDetailMenuApplication(ByVal TrxID As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Delete"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxDetailMenuApplication"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxMenuName", "0")
                sqlComm.Parameters.AddWithValue("TrxSubMenuName", "0")
                sqlComm.Parameters.AddWithValue("TrxDetailMenuName", "0")
                sqlComm.Parameters.AddWithValue("TrxUrl", "0")
                sqlComm.Parameters.AddWithValue("TrxType", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxDetailMenuApplication '" & TrxID & "','0','0','0','0','0','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Delete"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxDetailMenuApplication '" & TrxID & "','0','0','0','0','0','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxDetailMenuApplication '" & TrxID & "','0','0','0','0','0','" & TrxAction & "'"
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
    Public Function InsertSettingNotificationAddress(ByVal TrxUserCreate As String, ByVal TrxUserName As String, ByVal TrxEmailAddress As String, ByVal TrxStatus As String,
                                              ByVal TrxCreate As String, ByVal TrxOver As String, ByVal TrxClose As String, ByVal TrxEscalation As String,
                                              ByVal TrxDepartment As String, ByVal TrxVendor As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxNotificationAddress"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserCreate", TrxUserCreate)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxEmailAddress", AntiXssEncoder.HtmlEncode(TrxEmailAddress.Trim, True))
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxCreate", TrxCreate)
                sqlComm.Parameters.AddWithValue("TrxOver", TrxOver)
                sqlComm.Parameters.AddWithValue("TrxClose", TrxClose)
                sqlComm.Parameters.AddWithValue("TrxEscalation", TrxEscalation)
                sqlComm.Parameters.AddWithValue("TrxDepartment", TrxDepartment)
                sqlComm.Parameters.AddWithValue("TrxVendor", TrxVendor)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxNotificationAddress '0','" & TrxUserCreate & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxEmailAddress.Trim, True) & "','" & TrxStatus & "','" & TrxCreate & "','" & TrxOver & "','" & TrxClose & "','" & TrxEscalation & "','" & TrxDepartment & "','" & TrxVendor & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationAddress '0','" & TrxUserCreate & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxEmailAddress.Trim, True) & "','" & TrxStatus & "','" & TrxCreate & "','" & TrxOver & "','" & TrxClose & "','" & TrxEscalation & "','" & TrxDepartment & "','" & TrxVendor & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationAddress '0','" & TrxUserCreate & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxEmailAddress.Trim, True) & "','" & TrxStatus & "','" & TrxCreate & "','" & TrxOver & "','" & TrxClose & "','" & TrxEscalation & "','" & TrxDepartment & "','" & TrxVendor & "','" & TrxAction & "'"
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
    Public Function UpdateSettingNotificationAddress(ByVal TrxID As String, ByVal TrxUserCreate As String, ByVal TrxUserName As String, ByVal TrxStatus As String,
                                              ByVal TrxCreate As String, ByVal TrxOver As String, ByVal TrxClose As String, ByVal TrxEscalation As String,
                                              ByVal TrxDepartment As String, ByVal TrxVendor As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Update"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxNotificationAddress"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserCreate", TrxUserCreate)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxEmailAddress", "0")
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxCreate", TrxCreate)
                sqlComm.Parameters.AddWithValue("TrxOver", TrxOver)
                sqlComm.Parameters.AddWithValue("TrxClose", TrxClose)
                sqlComm.Parameters.AddWithValue("TrxEscalation", TrxEscalation)
                sqlComm.Parameters.AddWithValue("TrxDepartment", TrxDepartment)
                sqlComm.Parameters.AddWithValue("TrxVendor", TrxVendor)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxNotificationAddress '" & TrxID & "','" & TrxUserCreate & "','" & UserNameXSS & "','0','" & TrxStatus & "','" & TrxCreate & "','" & TrxOver & "','" & TrxClose & "','" & TrxEscalation & "','" & TrxDepartment & "','" & TrxVendor & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationAddress '" & TrxID & "','" & TrxUserCreate & "','" & UserNameXSS & "','0','" & TrxStatus & "','" & TrxCreate & "','" & TrxOver & "','" & TrxClose & "','" & TrxEscalation & "','" & TrxDepartment & "','" & TrxVendor & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationAddress '" & TrxID & "','" & TrxUserCreate & "','" & UserNameXSS & "','0','" & TrxStatus & "','" & TrxCreate & "','" & TrxOver & "','" & TrxClose & "','" & TrxEscalation & "','" & TrxDepartment & "','" & TrxVendor & "','" & TrxAction & "'"
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
    Public Function DeleteSettingNotificationAddress(ByVal TrxID As String, ByVal TrxUserCreate As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Delete"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxNotificationAddress"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserCreate", TrxUserCreate)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxEmailAddress", "0")
                sqlComm.Parameters.AddWithValue("TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("TrxCreate", "0")
                sqlComm.Parameters.AddWithValue("TrxOver", "0")
                sqlComm.Parameters.AddWithValue("TrxClose", "0")
                sqlComm.Parameters.AddWithValue("TrxEscalation", "0")
                sqlComm.Parameters.AddWithValue("TrxDepartment", "0")
                sqlComm.Parameters.AddWithValue("TrxVendor", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxNotificationAddress '" & TrxID & "','" & TrxUserCreate & "','" & TrxUserName & "','0','0','0','0','0','0','0','0','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationAddress '" & TrxID & "','" & TrxUserCreate & "','" & TrxUserName & "','0','0','0','0','0','0','0','0','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationAddress '" & TrxID & "','" & TrxUserCreate & "','" & TrxUserName & "','0','0','0','0','0','0','0','0','" & TrxAction & "'"
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
    Public Function InsertSettingNotification(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxValue As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxNotificationSetting"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxValue", AntiXssEncoder.HtmlEncode(TrxValue.Trim, True))
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
            strExec = "exec UIDESK_TrxNotificationSetting '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxValue.Trim, True) & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationSetting '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxValue.Trim, True) & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationSetting '" & TrxID & "','" & UserNameXSS & "','" & AntiXssEncoder.HtmlEncode(TrxValue.Trim, True) & "'"
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
    Public Function InsertNotificationTemplate(ByVal TrxUserName As String, ByVal TrxSubject As String, ByVal TrxBody As String,
                                              ByVal TrxFooter As String, ByVal TrxType As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxNotificationTemplate"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxSubject", HttpUtility.UrlDecode(TrxSubject))
                sqlComm.Parameters.AddWithValue("TrxBody", HttpUtility.UrlDecode(TrxBody))
                sqlComm.Parameters.AddWithValue("TrxFooter", HttpUtility.UrlDecode(TrxFooter))
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxNotificationTemplate '0','" & UserNameXSS & "','" & HttpUtility.UrlDecode(TrxSubject) & "','" & HttpUtility.UrlDecode(TrxBody) & "','" & HttpUtility.UrlDecode(TrxFooter) & "','" & TrxType & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationTemplate '0','" & UserNameXSS & "','" & HttpUtility.UrlDecode(TrxSubject) & "','" & HttpUtility.UrlDecode(TrxBody) & "','" & HttpUtility.UrlDecode(TrxFooter) & "','" & TrxType & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationTemplate '0','" & UserNameXSS & "','" & HttpUtility.UrlDecode(TrxSubject) & "','" & HttpUtility.UrlDecode(TrxBody) & "','" & HttpUtility.UrlDecode(TrxFooter) & "','" & TrxType & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function UpdateNotificationTemplate(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxSubject As String, ByVal TrxBody As String,
                                              ByVal TrxFooter As String, ByVal TrxType As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Update"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxNotificationTemplate"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxSubject", HttpUtility.UrlDecode(TrxSubject))
                sqlComm.Parameters.AddWithValue("TrxBody", HttpUtility.UrlDecode(TrxBody))
                sqlComm.Parameters.AddWithValue("TrxFooter", HttpUtility.UrlDecode(TrxFooter))
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxNotificationTemplate '" & TrxID & "','" & UserNameXSS & "','" & HttpUtility.UrlDecode(TrxSubject) & "','" & HttpUtility.UrlDecode(TrxBody) & "','" & HttpUtility.UrlDecode(TrxFooter) & "','" & TrxType & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationTemplate '" & TrxID & "','" & UserNameXSS & "','" & HttpUtility.UrlDecode(TrxSubject) & "','" & HttpUtility.UrlDecode(TrxBody) & "','" & HttpUtility.UrlDecode(TrxFooter) & "','" & TrxType & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationTemplate '" & TrxID & "','" & UserNameXSS & "','" & HttpUtility.UrlDecode(TrxSubject) & "','" & HttpUtility.UrlDecode(TrxBody) & "','" & HttpUtility.UrlDecode(TrxFooter) & "','" & TrxType & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function DeleteNotificationTemplate(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Delete"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxNotificationTemplate"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxSubject", "0")
                sqlComm.Parameters.AddWithValue("TrxBody", "0")
                sqlComm.Parameters.AddWithValue("TrxFooter", "0")
                sqlComm.Parameters.AddWithValue("TrxType", "0")
                sqlComm.Parameters.AddWithValue("TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxNotificationTemplate '" & TrxID & "','" & UserNameXSS & "','0','0','0','0','0','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Delete"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationTemplate '" & TrxID & "','" & UserNameXSS & "','0','0','0','0','0','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxNotificationTemplate '" & TrxID & "','" & UserNameXSS & "','0','0','0','0','0','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _Valuenya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    Public Function Encrypt(clearText As String) As String
        Dim EncryptionKey As String = "MAKV2SPBNI99212"
        Dim clearBytes As Byte() = Encoding.Unicode.GetBytes(clearText)
        Using encryptor As Aes = Aes.Create()
            Dim pdb As New Rfc2898DeriveBytes(EncryptionKey, New Byte() {&H49, &H76, &H61, &H6E, &H20, &H4D,
             &H65, &H64, &H76, &H65, &H64, &H65,
             &H76})
            encryptor.Key = pdb.GetBytes(32)
            encryptor.IV = pdb.GetBytes(16)
            Using ms As New MemoryStream()
                Using cs As New CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write)
                    cs.Write(clearBytes, 0, clearBytes.Length)
                    cs.Close()
                End Using
                clearText = Convert.ToBase64String(ms.ToArray())
            End Using
        End Using
        Return clearText
    End Function
    Public Function EncryptData(ByVal plaintext As String) As String

        ' Convert the plaintext string to a byte array.
        Dim plaintextBytes() As Byte =
            System.Text.Encoding.Unicode.GetBytes(plaintext)

        ' Create the stream.
        Dim ms As New System.IO.MemoryStream
        ' Create the encoder to write to the stream.
        Dim encStream As New CryptoStream(ms, TripleDes.CreateEncryptor(), System.Security.Cryptography.CryptoStreamMode.Write)

        ' Use the crypto stream to write the byte array to the stream.
        encStream.Write(plaintextBytes, 0, plaintextBytes.Length)
        encStream.FlushFinalBlock()

        ' Convert the encrypted stream to a printable string.
        Return Convert.ToBase64String(ms.ToArray)
    End Function
    Public Function DecryptData(
    ByVal encryptedtext As String) As String

        ' Convert the encrypted text string to a byte array.
        Dim encryptedBytes() As Byte = Convert.FromBase64String(encryptedtext)

        ' Create the stream.
        Dim ms As New System.IO.MemoryStream
        ' Create the decoder to write to the stream.
        Dim decStream As New CryptoStream(ms,
            TripleDes.CreateDecryptor(),
            System.Security.Cryptography.CryptoStreamMode.Write)

        ' Use the crypto stream to write the byte array to the stream.
        decStream.Write(encryptedBytes, 0, encryptedBytes.Length)
        decStream.FlushFinalBlock()

        ' Convert the plaintext stream to a string.
        Return System.Text.Encoding.Unicode.GetString(ms.ToArray)
    End Function
    Public Function Decrypt(cipherText As String) As String
        Dim TmpStr As String
        TmpStr = cipherText
        TmpStr = Replace(TmpStr, "%20", " ")

        Dim EncryptionKey As String = "MAKV2SPBNI99212"
        Dim cipherBytes As Byte() = Convert.FromBase64String(TmpStr)
        Using encryptor As Aes = Aes.Create()
            Dim pdb As New Rfc2898DeriveBytes(EncryptionKey, New Byte() {&H49, &H76, &H61, &H6E, &H20, &H4D,
             &H65, &H64, &H76, &H65, &H64, &H65,
             &H76})
            encryptor.Key = pdb.GetBytes(32)
            encryptor.IV = pdb.GetBytes(16)
            Using ms As New MemoryStream()
                Using cs As New CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write)
                    cs.Write(cipherBytes, 0, cipherBytes.Length)
                    cs.Close()
                End Using
                cipherText = Encoding.Unicode.GetString(ms.ToArray())
            End Using
        End Using
        Return TmpStr
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertProductName(ByVal TrxUserName As String, ByVal TrxCustomerID As String, ByVal TrxProduct As String,
                                                     ByVal TrxDescription As String, ByVal TrxType As String, ByVal TrxStatus As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Valuenya As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim UserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxProductName"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", UserNameXSS)
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxProduct", TrxProduct)
                sqlComm.Parameters.AddWithValue("TrxDescription", HttpUtility.UrlDecode(TrxDescription))
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
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
            strExec = "exec UIDESK_TrxProductName '0','" & UserNameXSS & "','" & TrxCustomerID & "','" & TrxProduct & "','" & HttpUtility.UrlDecode(TrxDescription) & "','" & TrxType & "','" & TrxStatus & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = "Data Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxProductName '0','" & UserNameXSS & "','" & TrxCustomerID & "','" & TrxProduct & "','" & HttpUtility.UrlDecode(TrxDescription) & "','" & TrxType & "','" & TrxStatus & "','" & TrxAction & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxID = _Valuenya
                objectTickets.TrxmsgSystem = _Valuenya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxProductName '0','" & UserNameXSS & "','" & TrxCustomerID & "','" & TrxProduct & "','" & HttpUtility.UrlDecode(TrxDescription) & "','" & TrxType & "','" & TrxStatus & "','" & TrxAction & "'"
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
    Public Function InsertEscalationIndividu(ByVal TrxID As String, ByVal TrxTicketNumber As String, ByVal TrxUserID As String, ByVal TrxUserCreate As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            If TrxID = "0" Then
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_TrxEscalationIndividu"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("TrxTicketNumber", TrxTicketNumber)
                    sqlComm.Parameters.AddWithValue("TrxUserID", TrxUserID)
                    sqlComm.Parameters.AddWithValue("TrxUserCreate", TrxUserCreate)
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            Else
                Using con As New SqlConnection(constr)
                    Dim sqlComm As New SqlCommand()
                    sqlComm.Connection = con
                    sqlComm.CommandText = "UIDESK_TrxEscalationIndividu"
                    sqlComm.CommandType = CommandType.StoredProcedure
                    sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                    sqlComm.Parameters.AddWithValue("TrxTicketNumber", "0")
                    sqlComm.Parameters.AddWithValue("TrxUserID", "0")
                    sqlComm.Parameters.AddWithValue("TrxUserCreate", "0")
                    con.Open()
                    sqlComm.ExecuteNonQuery()
                End Using
            End If
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEscalationIndividu '" & TrxID & "','" & TrxTicketNumber & "','" & TrxUserID & "','" & TrxUserCreate & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEscalationIndividu '" & TrxID & "','" & TrxTicketNumber & "','" & TrxUserID & "','" & TrxUserCreate & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateEscalationIndividu(ByVal TrxTicketNumber As String, ByVal TrxUserCreate As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxEscalationIndividuAction"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxTicketNumber", TrxTicketNumber)
                sqlComm.Parameters.AddWithValue("TrxUserCreate", TrxUserCreate)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEscalationIndividuAction '" & TrxTicketNumber & "','" & TrxUserCreate & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxEscalationIndividuAction '" & TrxTicketNumber & "','" & TrxUserCreate & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertForgotPassword(ByVal TrxEmailAddress As String, ByVal TrxEncodedString As String) As String
        Dim TrxEmailAddressXSS As String = AntiXssEncoder.HtmlEncode(TrxEmailAddress.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxGenerateEmailID As String = DateTime.Now.ToString("ddMMyyyyhhmmss")
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxForgotPassword"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxGenerateEmailID", TrxGenerateEmailID)
                sqlComm.Parameters.AddWithValue("TrxEmailAddress", TrxEmailAddressXSS)
                sqlComm.Parameters.AddWithValue("TrxEncrypt", TrxEncodedString)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxForgotPassword '" & TrxGenerateEmailID & "','" & TrxEmailAddressXSS & "', '" & TrxEncodedString & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxID = _Result
            objectTickets.TrxmsgSystem = _Result
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxForgotPassword '" & TrxGenerateEmailID & "','" & TrxEmailAddressXSS & "', '" & TrxEncodedString & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            LogSuccess(HttpContext.Current.Session("UserName"), "Result " & _Result)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetWhereRecordsForgotPassword(ByVal tableType As String, ByVal tableName As String, ByVal paramQuery As String, ByVal Value As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                If tableType = "AllWhereData" Then

                    sql = "select *, DATEDIFF(minute, START_DATE, GETDATE()) AS MinuteInterval from [" & tableName & "] Where EMAIL_ADDRESS='" & Value & "' And STATUS='0'"

                    LogSuccess(strLogTime, sql)

                End If
                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
            Dim tableJson As String = ConvertDataTabletoString(dt)
            Return tableJson
        Catch ex As Exception

        End Try
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ChangeForgotPassword(ByVal TrxNewPassword As String, ByVal TrxEmailAddress As String) As String
        Dim TrxNewPasswordXSS As String = AntiXssEncoder.HtmlEncode(TrxNewPassword.Trim, True)
        Dim TrxEmailAddressXSS As String = AntiXssEncoder.HtmlEncode(TrxEmailAddress.Trim, True)
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim _Result As String = String.Empty
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxChangeForgotPassword"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxNewPassword", TrxNewPasswordXSS)
                sqlComm.Parameters.AddWithValue("TrxEmailAddress", TrxEmailAddressXSS)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("TrxResult").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxChangeForgotPassword '" & TrxNewPasswordXSS & "','" & TrxEmailAddressXSS & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Change Forgot Password Success"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxChangeForgotPassword '" & TrxNewPasswordXSS & "','" & TrxEmailAddressXSS & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxmsgSystem = _Result
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxChangeForgotPassword '" & TrxNewPassword & "','" & TrxEmailAddress & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            End If
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    Public Function ReplaceSpecialLetter(ByVal str)
        Dim TmpStr As String
        TmpStr = str
        TmpStr = Replace(TmpStr, "%20", " ")
        LogSuccess(strLogTime, TmpStr)
        ReplaceSpecialLetter = Decrypt(TmpStr)
    End Function
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
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UIDESK_TrmDropdown(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec UIDESK_TrmDropdownCategory"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmDropdownCategory", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
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
    Public Function UIDESK_TrmEscalationUnit(ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec UIDESK_TrmEscalationUnit"
        Dim ExecSP = "" & NameSP & " '" & TrxUserName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmEscalationUnit", conn)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
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
    Public Function UIDESK_TrmMasterCombo(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec UIDESK_TrmDropdown"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrmDropdown", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function UIDESK_TrxBucket(ByVal TrxStartDate As String, ByVal TrxEnddate As String, ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec UIDESK_TrxBucket"
        Dim ExecSP = "" & NameSP & " '" & TrxStartDate & "','" & TrxEnddate & "','" & TrxUserName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxBucket", conn)
                sqlComm.Parameters.AddWithValue("@TrxStartDate", TrxStartDate)
                sqlComm.Parameters.AddWithValue("@TrxEndDate", TrxEnddate)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
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
    Public Function UIDESK_TrxJourneyEscalation(ByVal TrxID As String, ByVal TrxSearching As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec UIDESK_TrxJourneyEscalation"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxUserName & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxJourneyEscalation", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxSearching", TrxSearching)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function UIDESK_TrxTransactionTicket(ByVal TrxID As String, ByVal TrxSearching As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec UIDESK_TrxTransactionTicket"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxSearching & "','" & TrxUserName & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxTransactionTicket", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxSearching", TrxSearching)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function UIDESK_TrxSosialMedia(ByVal TrxID As String, ByVal TrxSearching As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec UIDESK_TrxSosialMedia"
        Dim ExecSP = "" & NameSP & " '" & TrxID & "','" & TrxSearching & "','" & TrxUserName & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("UIDESK_TrxSosialMedia", conn)
                sqlComm.Parameters.AddWithValue("@TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("@TrxSearching", TrxSearching)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function TableTransactionTrmSite(ByVal ID As String, ByVal Site As String, ByVal Location As String,
                                          ByVal Status As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim SiteXSS As String = AntiXssEncoder.HtmlEncode(Site.Trim, True)
        Dim LocationXSS As String = AntiXssEncoder.HtmlEncode(Location.Trim, True)
        Dim StatusXSS As String = AntiXssEncoder.HtmlEncode(Status.Trim, True)
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)

        Dim NameSP = "Exec V2_UIDESK_TrxMasterSite"
        Dim ExecSP = "" & NameSP & " '" & ID & "','" & SiteXSS & "','" & LocationXSS & "','" & StatusXSS & "','" & TrxUserNameXSS & "','" & TrxAction & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("V2_UIDESK_TrxMasterSite", conn)
                sqlComm.Parameters.AddWithValue("@ID", ID)
                sqlComm.Parameters.AddWithValue("@Site", SiteXSS)
                sqlComm.Parameters.AddWithValue("@Location", LocationXSS)
                sqlComm.Parameters.AddWithValue("@Status", StatusXSS)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserNameXSS)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
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
    Public Function UpdateTransactionTrmSite(ByVal ID As String, ByVal Site As String, ByVal Location As String,
                                            ByVal Status As String, ByVal TrxUserName As String, ByVal TrxAction As String) As String
        Dim SiteXSS As String = AntiXssEncoder.HtmlEncode(Site.Trim, True)
        Dim LocationXSS As String = AntiXssEncoder.HtmlEncode(Location.Trim, True)
        Dim StatusXSS As String = AntiXssEncoder.HtmlEncode(Status.Trim, True)
        Dim TrxUserNameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)

        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "V2_UIDESK_TrxMasterSite"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("@ID", ID)
                sqlComm.Parameters.AddWithValue("@Site", SiteXSS)
                sqlComm.Parameters.AddWithValue("@Location", LocationXSS)
                sqlComm.Parameters.AddWithValue("@Status", StatusXSS)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserNameXSS)
                sqlComm.Parameters.AddWithValue("@TrxAction", TrxAction)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec V2_UIDESK_TrxMasterSite " & ",'" & ID & "','" & SiteXSS & "','" & LocationXSS & "','" & StatusXSS & "','" & TrxUserNameXSS & "','" & TrxAction & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Update"
            listTickets.Add(objectTickets)
            strExec = "exec V2_UIDESK_TrxMasterSite " & ",'" & ID & "','" & SiteXSS & "','" & LocationXSS & "','" & StatusXSS & "','" & TrxUserNameXSS & "','" & TrxAction & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function V2_UIDESK_TrxLayer(ByVal TrxUserName As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()

        Dim NameSP = "Exec V2_UIDESK_TrxLayer"
        Dim ExecSP = "" & NameSP & " '" & TrxUserName & "'"
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()
                Dim sqlComm As SqlCommand = New SqlCommand("V2_UIDESK_TrxLayer", conn)
                sqlComm.Parameters.AddWithValue("@TrxUserName", TrxUserName)
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
    Public Function VUE_InsertTransaction(ByVal Data_1 As String, ByVal Data_2 As String, ByVal Data_3 As String, ByVal Data_4 As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "VUE_UIDESK_InsertTransaction"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("Data_1", Data_1)
                sqlComm.Parameters.AddWithValue("Data_2", Data_2)
                sqlComm.Parameters.AddWithValue("Data_3", Data_3)
                sqlComm.Parameters.AddWithValue("Data_4", Data_4)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec VUE_UIDESK_InsertTransaction '" & Data_1 & "','" & Data_2 & "','" & Data_3 & "','" & Data_4 & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.TrxmsgSystem = "Data Has Been Save"
            listTickets.Add(objectTickets)
            strExec = "exec VUE_UIDESK_InsertTransaction '" & Data_1 & "','" & Data_2 & "','" & Data_3 & "','" & Data_4 & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class