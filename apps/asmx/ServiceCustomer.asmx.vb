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
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
<ScriptService()>
<ToolboxItem(False)> _
Public Class ServiceCustomer
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn
    Dim VariabelCookiesUsername As HttpCookie = HttpContext.Current.Request.Cookies("CookiesUserName")
    Public Class resultInsert
        Public Property Result As String
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property msgSystem As String
        Public Property TicketNumber As String
        Public Property CustomerID As String
    End Class
    Public Class listTransactionCustomer
        Public Property Result As String
        Public Property TrxCustomerID As String
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
    Public Class listNomorWhatsApp
        Public Property StatusNya As String
        Public Property NomorWhatsApp As String
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

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        js.MaxJsonLength = Int32.MaxValue
        Return js.Serialize(rows)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetWhereRecordsTop100(ByVal tableType As String, ByVal tableName As String, ByVal paramQuery As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Using conn As SqlConnection = New SqlConnection(connstring)
            conn.Open()
            If tableType = "AllWhereData" Then

                sql = "select top 90 * from [" & tableName & "] " & paramQuery & " "
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
        Dim tableJson As String = BigConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetWhereRecordsCounting(ByVal tableType As String, ByVal tableName As String, ByVal paramQuery As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Using conn As SqlConnection = New SqlConnection(connstring)
            Try
                conn.Open()
                If tableType = "AllWhereData" Then

                    sql = "select count(*) as Data from [" & tableName & "] " & paramQuery & " "
                End If
                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
                LogSuccess(HttpContext.Current.Session("UserName"), sql)
            Catch ex As Exception
                LogError(HttpContext.Current.Session("UserName"), ex, sql)
            End Try        
        End Using
        Dim tableJson As String = ConvertDataTabletoString(dt)
        Return tableJson
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertTransactionCustomer(ByVal TrxUsername As String, ByVal TrxCusTomerName As String, ByVal TrxCusTomerEmail As String, ByVal TrxCusTomerPhone As String,
                                              ByVal TrxCusTomerGender As String, ByVal TrxCusTomerDate As String, ByVal TrxCustomerPolisNumber As String, ByVal TrxCusTomerNIK As String, ByVal TrxCusTomerAlamat As String,
                                              ByVal TrxNumberID As String, ByVal TrxFacebook As String, ByVal TrxInstagram As String, ByVal TrxTwitter As String,
                                              ByVal TrxProvinsi As String, ByVal TrxKota As String, ByVal TrxKecamatan As String, ByVal TrxKelurahan As String,
                                              ByVal TrxUserNameCustomer As String, ByVal TrxPasswordCustomer As String) As String
        Dim TrxCustomerID As String = New Random().Next(1000000, 9999999)  'Request.QueryString("i")
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxGenerateID As String = String.Empty
        If TrxNumberID = "" Then
            TrxGenerateID = New Random().Next(100000, 999999)
        Else
            TrxGenerateID = TrxNumberID
        End If
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUsername.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_InsertCustomer"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", HttpUtility.UrlDecode(TrxCusTomerName))
                sqlComm.Parameters.AddWithValue("TrxEmail", TrxCusTomerEmail)
                sqlComm.Parameters.AddWithValue("TrxPhone", TrxCusTomerPhone)
                sqlComm.Parameters.AddWithValue("TrxGender", TrxCusTomerGender)
                sqlComm.Parameters.AddWithValue("TrxBirth", TrxCusTomerDate)
                sqlComm.Parameters.AddWithValue("TrxCIF", TrxCustomerPolisNumber)
                sqlComm.Parameters.AddWithValue("TrxNIK", TrxCusTomerNIK)
                sqlComm.Parameters.AddWithValue("TrxAddress", HttpUtility.UrlDecode(TrxCusTomerAlamat))
                sqlComm.Parameters.AddWithValue("TrxMenu", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxGenesysID", TrxGenerateID)
                sqlComm.Parameters.AddWithValue("TrxFacebook", TrxFacebook)
                sqlComm.Parameters.AddWithValue("TrxInstagram", TrxInstagram)
                sqlComm.Parameters.AddWithValue("TrxTwitter", TrxTwitter)
                sqlComm.Parameters.AddWithValue("TrxProvinsi", TrxProvinsi)
                sqlComm.Parameters.AddWithValue("TrxKota", TrxKota)
                sqlComm.Parameters.AddWithValue("TrxKecamatan", TrxKecamatan)
                sqlComm.Parameters.AddWithValue("TrxKelurahan", TrxKelurahan)
                sqlComm.Parameters.AddWithValue("TrxUserNameCustomer", TrxUserNameCustomer)
                sqlComm.Parameters.AddWithValue("TrxPasswordCustomer", TrxPasswordCustomer)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _CustomerID &= sqldr("CustomerID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_InsertCustomer '" & TrxCustomerID & "','" & TrxUsernameXSS & "','" & HttpUtility.UrlDecode(TrxCusTomerName) & "','" & TrxCusTomerEmail & "','" & TrxCusTomerPhone & "','" & TrxCusTomerGender & "','" & TrxCusTomerDate & "','" & TrxCustomerPolisNumber & "','" & TrxCusTomerNIK & "'," & "'" & HttpUtility.UrlDecode(TrxCusTomerAlamat) & "'," & "'" & TrxCustomerID & "'," & "'" & TrxGenerateID & "'," & "'" & TrxFacebook & "'," & "'" & TrxInstagram & "','" & TrxTwitter & "','" & TrxProvinsi & "','" & TrxKota & "','" & TrxKecamatan & "','" & TrxKelurahan & "','" & TrxUserNameCustomer & "','" & TrxPasswordCustomer & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "InsertSuccess" Then
                objectTickets.Result = "True"
                objectTickets.CustomerID = _CustomerID
                objectTickets.msgSystem = "Data Customer Has Been Insert"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_Temp_InsertCustomer '" & TrxCustomerID & "','" & TrxUsernameXSS & "','" & HttpUtility.UrlDecode(TrxCusTomerName) & "','" & TrxCusTomerEmail & "','" & TrxCusTomerPhone & "','" & TrxCusTomerGender & "','" & TrxCusTomerDate & "','" & TrxCustomerPolisNumber & "','" & TrxCusTomerNIK & "'," & "'" & HttpUtility.UrlDecode(TrxCusTomerAlamat) & "'," & "'" & TrxCustomerID & "'," & "'" & TrxGenerateID & "'," & "'" & TrxFacebook & "'," & "'" & TrxInstagram & "','" & TrxTwitter & "','" & TrxProvinsi & "','" & TrxKota & "','" & TrxKecamatan & "','" & TrxKelurahan & "','" & TrxUserNameCustomer & "','" & TrxPasswordCustomer & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.CustomerID = _CustomerID
                objectTickets.msgSystem = _Result
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_Temp_InsertCustomer '" & TrxCustomerID & "','" & TrxUsernameXSS & "','" & HttpUtility.UrlDecode(TrxCusTomerName) & "','" & TrxCusTomerEmail & "','" & TrxCusTomerPhone & "','" & TrxCusTomerGender & "','" & TrxCusTomerDate & "','" & TrxCustomerPolisNumber & "','" & TrxCusTomerNIK & "'," & "'" & HttpUtility.UrlDecode(TrxCusTomerAlamat) & "'," & "'" & TrxCustomerID & "'," & "'" & TrxGenerateID & "'," & "'" & TrxFacebook & "'," & "'" & TrxInstagram & "','" & TrxTwitter & "','" & TrxProvinsi & "','" & TrxKota & "','" & TrxKecamatan & "','" & TrxKelurahan & "','" & TrxUserNameCustomer & "','" & TrxPasswordCustomer & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _Result)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateTransactionCustomer(ByVal TrxCustomerID As String, ByVal TrxUsername As String, ByVal TrxCusTomerName As String, ByVal TrxCusTomerEmail As String, ByVal TrxCusTomerPhone As String, ByVal TrxCusTomerGender As String,
                                              ByVal TrxCusTomerDate As String, ByVal TrxCusTomerAlamat As String, ByVal TrxFacebook As String, ByVal TrxInstagram As String, ByVal TrxTwitter As String,
                                              ByVal TrxStatus As String, ByVal TrxCusTomerNIK As String, ByVal TrxProvinsi As String, ByVal TrxKota As String, ByVal TrxKecamatan As String,
                                              ByVal TrxKelurahan As String, ByVal TrxUserNameCustomer As String, ByVal TrxPasswordCustomer As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUsername.Trim, True)
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_UpdateCustomer"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxName", HttpUtility.UrlDecode(TrxCusTomerName))
                sqlComm.Parameters.AddWithValue("TrxEmail", TrxCusTomerEmail)
                sqlComm.Parameters.AddWithValue("TrxPhone", TrxCusTomerPhone)
                sqlComm.Parameters.AddWithValue("TrxGender", TrxCusTomerGender)
                sqlComm.Parameters.AddWithValue("TrxBirth", TrxCusTomerDate)
                sqlComm.Parameters.AddWithValue("TrxCIF", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxNIK", TrxCusTomerNIK)
                sqlComm.Parameters.AddWithValue("TrxAddress", HttpUtility.UrlDecode(TrxCusTomerAlamat))
                sqlComm.Parameters.AddWithValue("TrxFacebook", TrxFacebook)
                sqlComm.Parameters.AddWithValue("TrxInstagram", TrxInstagram)
                sqlComm.Parameters.AddWithValue("TrxTwitter", TrxTwitter)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxProvinsi", TrxProvinsi)
                sqlComm.Parameters.AddWithValue("TrxKota", TrxKota)
                sqlComm.Parameters.AddWithValue("TrxKecamatan", TrxKecamatan)
                sqlComm.Parameters.AddWithValue("TrxKelurahan", TrxKelurahan)
                sqlComm.Parameters.AddWithValue("TrxUserNameCustomer", TrxUserNameCustomer)
                sqlComm.Parameters.AddWithValue("TrxPasswordCustomer", TrxPasswordCustomer)
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
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_UpdateCustomer '" & TrxCustomerID & "','" & TrxUsernameXSS & "','" & HttpUtility.UrlDecode(TrxCusTomerName) & "','" & TrxCusTomerEmail & "','" & TrxCusTomerPhone & "','" & TrxCusTomerGender & "','" & TrxCusTomerDate & "','" & TrxCustomerID & "','" & TrxCusTomerNIK & "','" & HttpUtility.UrlDecode(TrxCusTomerAlamat) & "','" & TrxFacebook & "','" & TrxInstagram & "','" & TrxTwitter & "','" & TrxStatus & "','" & TrxProvinsi & "','" & TrxKota & "','" & TrxKecamatan & "','" & TrxKelurahan & "','" & TrxUserNameCustomer & "','" & TrxPasswordCustomer & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "UpdateSuccess" Then
                objectTickets.Result = "True"
                objectTickets.msgSystem = "Data has been update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_Temp_UpdateCustomer '" & TrxCustomerID & "','" & TrxUsernameXSS & "','" & HttpUtility.UrlDecode(TrxCusTomerName) & "','" & TrxCusTomerEmail & "','" & TrxCusTomerPhone & "','" & TrxCusTomerGender & "','" & TrxCusTomerDate & "','" & TrxCustomerID & "','" & TrxCusTomerNIK & "','" & HttpUtility.UrlDecode(TrxCusTomerAlamat) & "','" & TrxFacebook & "','" & TrxInstagram & "','" & TrxTwitter & "','" & TrxStatus & "','" & TrxProvinsi & "','" & TrxKota & "','" & TrxKecamatan & "','" & TrxKelurahan & "','" & TrxUserNameCustomer & "','" & TrxPasswordCustomer & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.msgSystem = _Result
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_Temp_UpdateCustomer '" & TrxCustomerID & "','" & TrxUsernameXSS & "','" & HttpUtility.UrlDecode(TrxCusTomerName) & "','" & TrxCusTomerEmail & "','" & TrxCusTomerPhone & "','" & TrxCusTomerGender & "','" & TrxCusTomerDate & "','" & TrxCustomerID & "','" & TrxCusTomerNIK & "','" & HttpUtility.UrlDecode(TrxCusTomerAlamat) & "','" & TrxFacebook & "','" & TrxInstagram & "','" & TrxTwitter & "','" & TrxStatus & "','" & TrxProvinsi & "','" & TrxKota & "','" & TrxKecamatan & "','" & TrxKelurahan & "','" & TrxUserNameCustomer & "','" & TrxPasswordCustomer & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _Result)
            End If
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ListDataCustomer(ByVal TrxAction As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec SP_Temp_SearchingChannel"

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
    Public Function InsertOtherChannel(ByVal TrxUserName As String, ByVal TrxCustomerID As String, ByVal TrxChannelValue As String, ByVal TrxChannelType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxChannelValueXSS As String = AntiXssEncoder.HtmlEncode(TrxChannelValue.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_InsertOtherChannel"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxChannelValue", TrxChannelValueXSS)
                sqlComm.Parameters.AddWithValue("TrxChannelType", TrxChannelType)
                con.Open()
                'sqlcom.ExecuteNonQuery()
                'con.Close()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _CustomerID &= sqldr("CustomerID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_InsertOtherChannel " & "'" & TrxCustomerID & "'," & "'" & TrxUsernameXSS & "'," & "'" & TrxChannelValueXSS & "'," & "'" & TrxChannelType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.CustomerID = _CustomerID
                objectTickets.msgSystem = "Data Channel Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_Temp_InsertOtherChannel " & "'" & TrxCustomerID & "'," & "'" & TrxUsernameXSS & "'," & "'" & TrxChannelValueXSS & "'," & "'" & TrxChannelType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.CustomerID = _CustomerID
                objectTickets.msgSystem = _Result
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_Temp_InsertOtherChannel " & "'" & TrxCustomerID & "'," & "'" & TrxUsernameXSS & "'," & "'" & TrxChannelValueXSS & "'," & "'" & TrxChannelType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _Result)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateOtherChannel(ByVal TrxID As String, ByVal TrxUserName As String, ByVal TrxCustomerID As String, ByVal TrxChannelValue As String, ByVal TrxChannelType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxChannelValueXSS As String = AntiXssEncoder.HtmlEncode(TrxChannelValue.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_UpdateOtherChannel"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxChannelValue", TrxChannelValueXSS)
                sqlComm.Parameters.AddWithValue("TrxChannelType", TrxChannelType)
                con.Open()
                'sqlcom.ExecuteNonQuery()
                'con.Close()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _CustomerID &= sqldr("CustomerID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_UpdateOtherChannel '" & TrxID & "','" & TrxCustomerID & "'," & "'" & TrxUsernameXSS & "'," & "'" & TrxChannelValueXSS & "'," & "'" & TrxChannelType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.CustomerID = _CustomerID
                objectTickets.msgSystem = "Data Channel Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_Temp_UpdateOtherChannel '" & TrxID & "','" & TrxCustomerID & "'," & "'" & TrxUsernameXSS & "'," & "'" & TrxChannelValueXSS & "'," & "'" & TrxChannelType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.CustomerID = _CustomerID
                objectTickets.msgSystem = _Result
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_Temp_UpdateOtherChannel '" & TrxID & "','" & TrxCustomerID & "'," & "'" & TrxUsernameXSS & "'," & "'" & TrxChannelValue & "'," & "'" & TrxChannelType & "'"
                LogSuccess(HttpContext.Current.Session("UserName"), strExec)
                LogSuccess(HttpContext.Current.Session("UserName"), _Result)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteOtherChannel(ByVal TrxUserName As String, ByVal TrxCustomerID As String, ByVal TrxChannelValue As String, ByVal TrxChannelType As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUserName.Trim, True)
        Dim TrxChannelValueXSS As String = AntiXssEncoder.HtmlEncode(TrxChannelValue.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_DeleteOtherChannel"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsernameXSS)
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxChannelValue", TrxChannelValueXSS)
                sqlComm.Parameters.AddWithValue("TrxChannelType", TrxChannelType)
                con.Open()
                'sqlcom.ExecuteNonQuery()
                'con.Close()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _CustomerID &= sqldr("CustomerID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_DeleteOtherChannel " & "'" & TrxUsernameXSS & "'," & "'" & TrxCustomerID & "'," & "'" & TrxChannelValueXSS & "'," & "'" & TrxChannelType & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Channel Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_DeleteOtherChannel " & "'" & TrxUsernameXSS & "'," & "'" & TrxCustomerID & "'," & "'" & TrxChannelValueXSS & "'," & "'" & TrxChannelType & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)

            'If _Result = "Success" Then
            '    objectTickets.Result = "True"
            '    objectTickets.CustomerID = _CustomerID
            '    objectTickets.msgSystem = "Data Channel Has Been Delete"
            '    listTickets.Add(objectTickets)
            '    strExec = "exec UIDESK_Temp_DeleteOtherChannel " & "'" & TrxCustomerID & "'," & "'" & TrxUserName & "'," & "'" & TrxChannelValue & "'," & "'" & TrxChannelType & "'"
            '    LogSuccess(strLogTime, strExec)
            'Else
            '    objectTickets.Result = "False"
            '    objectTickets.CustomerID = _CustomerID
            '    objectTickets.msgSystem = _Result
            '    listTickets.Add(objectTickets)
            '    strExec = "exec UIDESK_Temp_DeleteOtherChannel " & "'" & TrxCustomerID & "'," & "'" & TrxUserName & "'," & "'" & TrxChannelValue & "'," & "'" & TrxChannelType & "'"
            '    LogSuccess(strLogTime, strExec)
            '    LogSuccess(strLogTime, _Result)
            'End If
            ' ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function BoxDashbardCustomer(ByVal TrxCustomerID As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec UIDESK_BoxDashboardCustomer '" & TrxCustomerID & "'"

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
    Public Function DataTableDashbardCustomer(ByVal TrxCustomerID As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "select * from vw_temp_todolist Where NIK='" & TrxCustomerID & "' And Status='" & TrxStatus & "'"

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
    Public Function BoxDashbardVendor(ByVal TrxVendorID As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec UIDESK_BoxDashboardVendor '" & TrxVendorID & "'"

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
    Public Function DataTableDashbardVendor(ByVal TrxVendorID As String, ByVal TrxStatus As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "select * from UIDESK_VendorTaskboard Where VendorID='" & TrxVendorID & "' And VendorStatus=1 And Status='" & TrxStatus & "'"

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
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertTransactionCustomerUpload(ByVal TrxUsername As String, ByVal TrxCustomerID As String, ByVal TrxName As String, ByVal TrxEmail As String, ByVal TrxPhone As String,
                                              ByVal TrxAlamat As String, ByVal TrxBirth As String, ByVal TrxGender As String, ByVal TrxPolisNumber As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxUsernameXSS As String = AntiXssEncoder.HtmlEncode(TrxUsername.Trim, True)
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCRMLead"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsername)
                sqlComm.Parameters.AddWithValue("TrxName", HttpUtility.UrlDecode(TrxName))
                sqlComm.Parameters.AddWithValue("TrxEmail", TrxEmail)
                sqlComm.Parameters.AddWithValue("TrxPhone", TrxPhone)
                sqlComm.Parameters.AddWithValue("TrxAlamat", HttpUtility.UrlDecode(TrxAlamat))
                sqlComm.Parameters.AddWithValue("TrxBirth", TrxBirth)
                sqlComm.Parameters.AddWithValue("TrxGender", TrxGender)
                sqlComm.Parameters.AddWithValue("TrxPolisNumber", TrxPolisNumber)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _CustomerID &= sqldr("CustomerID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxCRMLead '" & TrxCustomerID & "','" & TrxUsername & "','" & HttpUtility.UrlDecode(TrxName) & "','" & TrxEmail & "','" & TrxPhone & "','" & HttpUtility.UrlDecode(TrxAlamat) & "','" & TrxBirth & "','" & TrxGender & "','" & TrxPolisNumber & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "InsertSuccess" Then
                objectTickets.Result = "True"
                objectTickets.CustomerID = _CustomerID
                objectTickets.msgSystem = "Data Customer Has Been Insert"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCRMLead '" & TrxCustomerID & "','" & TrxUsername & "','" & HttpUtility.UrlDecode(TrxName) & "','" & TrxEmail & "','" & TrxPhone & "','" & HttpUtility.UrlDecode(TrxAlamat) & "','" & TrxBirth & "','" & TrxGender & "','" & TrxPolisNumber & "'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.CustomerID = _CustomerID
                objectTickets.msgSystem = _Result
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCRMLead '" & TrxCustomerID & "','" & TrxUsername & "','" & HttpUtility.UrlDecode(TrxName) & "','" & TrxEmail & "','" & TrxPhone & "','" & HttpUtility.UrlDecode(TrxAlamat) & "','" & TrxBirth & "','" & TrxGender & "','" & TrxPolisNumber & "'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, _Result)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
   <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertTransactionCustomerCRM(ByVal TrxUsername As String, ByVal TrxCustomerID As String, ByVal TrxName As String, ByVal TrxEmail As String, ByVal TrxPhone As String,
                                              ByVal TrxAlamat As String, ByVal TrxKota As String, ByVal TrxProvinsi As String, ByVal TrxBillingStreet As String,
                                              ByVal TrxBillingKota As String, ByVal TrxBillingProvinsi As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim TrxGenerateID As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxCustomerCRM"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsername)
                sqlComm.Parameters.AddWithValue("TrxName", HttpUtility.UrlDecode(TrxName))
                sqlComm.Parameters.AddWithValue("TrxEmail", TrxEmail)
                sqlComm.Parameters.AddWithValue("TrxPhone", TrxPhone)
                sqlComm.Parameters.AddWithValue("TrxAlamat", HttpUtility.UrlDecode(TrxAlamat))
                sqlComm.Parameters.AddWithValue("TrxKota", TrxKota)
                sqlComm.Parameters.AddWithValue("TrxProvinsi", TrxProvinsi)
                sqlComm.Parameters.AddWithValue("TrxBillingStreet", TrxBillingStreet)
                sqlComm.Parameters.AddWithValue("TrxBillingKota", TrxBillingKota)
                sqlComm.Parameters.AddWithValue("TrxBillingProvinsi", TrxBillingProvinsi)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _CustomerID &= sqldr("CustomerID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxCustomerCRM '" & TrxCustomerID & "','" & TrxUsername & "','" & HttpUtility.UrlDecode(TrxName) & "','" & TrxEmail & "','" & TrxPhone & "','" & HttpUtility.UrlDecode(TrxAlamat) & "','" & TrxKota & "','" & TrxProvinsi & "','" & HttpUtility.UrlDecode(TrxBillingStreet) & "','" & TrxBillingKota & "','" & TrxBillingProvinsi & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "InsertSuccess" Then
                objectTickets.Result = "True"
                objectTickets.CustomerID = _CustomerID
                objectTickets.msgSystem = "Data Customer Has Been Insert"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCustomerCRM '" & TrxCustomerID & "','" & TrxUsername & "','" & HttpUtility.UrlDecode(TrxName) & "','" & TrxEmail & "','" & TrxPhone & "','" & HttpUtility.UrlDecode(TrxAlamat) & "','" & TrxKota & "','" & TrxProvinsi & "','" & HttpUtility.UrlDecode(TrxBillingStreet) & "','" & TrxBillingKota & "','" & TrxBillingProvinsi & "'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.CustomerID = _CustomerID
                objectTickets.msgSystem = _Result
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxCustomerCRM '" & TrxCustomerID & "','" & TrxUsername & "','" & HttpUtility.UrlDecode(TrxName) & "','" & TrxEmail & "','" & TrxPhone & "','" & HttpUtility.UrlDecode(TrxAlamat) & "','" & TrxKota & "','" & TrxProvinsi & "','" & HttpUtility.UrlDecode(TrxBillingStreet) & "','" & TrxBillingKota & "','" & TrxBillingProvinsi & "'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, _Result)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function ValidasiDataCustomer(ByVal filterData As String) As String
        Dim listTickets As List(Of listTransactionCustomer) = New List(Of listTransactionCustomer)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec ValidasiDataCustomer 'PageLoad','" & filterData & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTransactionCustomer = New listTransactionCustomer()
                    objectTickets.Result = rdr("HasilNya").ToString()
                    objectTickets.TrxCustomerID = rdr("CustomerID").ToString()
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
    Public Function SearchingDataCustomer(ByVal filterData As String) As String
        Dim listTickets As List(Of listTransactionCustomer) = New List(Of listTransactionCustomer)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec ValidasiDataCustomer 'TxtSearch','" & filterData & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTransactionCustomer = New listTransactionCustomer()
                    objectTickets.Result = rdr("HasilNya").ToString()
                    objectTickets.TrxCustomerID = rdr("CustomerID").ToString()
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
    Public Function DataWhatsApp(ByVal filterData As String) As String
        Dim listTickets As List(Of listNomorWhatsApp) = New List(Of listNomorWhatsApp)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec DataNomorWhatsApp '" & filterData & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listNomorWhatsApp = New listNomorWhatsApp()
                    objectTickets.StatusNya = rdr("StatusNya").ToString()
                    objectTickets.NomorWhatsApp = rdr("NomorWhatsApp").ToString()
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
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateSynroniseProfileAPI(ByVal TrxType As String, ByVal TrxName As String, ByVal TrxEmail As String, ByVal TrxPhone As String,
                                              ByVal TrxGender As String, ByVal TrxBirth As String, ByVal TrxNIK As String,
                                              ByVal TrxAddress As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim _Result As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _TrxPhone As String = "-"
        Dim _TrxEmailID As String = "-"
        If TrxEmail = "" Then
            _TrxEmailID = "-"
        Else
            _TrxEmailID = TrxEmail
        End If
        If TrxPhone = "" Then
            _TrxPhone = "-"
        Else
            _TrxPhone = TrxPhone
        End If
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUpdateProfileAPI"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxType", TrxType)
                sqlComm.Parameters.AddWithValue("TrxName", HttpUtility.UrlDecode(TrxName))
                sqlComm.Parameters.AddWithValue("TrxEmail", _TrxEmailID)
                sqlComm.Parameters.AddWithValue("TrxPhone", _TrxPhone)
                sqlComm.Parameters.AddWithValue("TrxGender", TrxGender)
                sqlComm.Parameters.AddWithValue("TrxBirth", TrxBirth)
                sqlComm.Parameters.AddWithValue("TrxNIK", TrxNIK)
                sqlComm.Parameters.AddWithValue("TrxAddress", TrxAddress)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _CustomerID &= sqldr("CustomerID").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUpdateProfileAPI '" & TrxType & "','" & TrxName & "','" & TrxEmail & "','" & TrxPhone & "','" & TrxGender & "','" & TrxBirth & "','" & TrxNIK & "','" & TrxAddress & "','" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.CustomerID = _CustomerID
            objectTickets.msgSystem = "Data Has Been Delete"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUpdateProfileAPI '" & TrxType & "','" & TrxName & "','" & TrxEmail & "','" & TrxPhone & "','" & TrxGender & "','" & TrxBirth & "','" & TrxNIK & "','" & TrxAddress & "','" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
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
End Class