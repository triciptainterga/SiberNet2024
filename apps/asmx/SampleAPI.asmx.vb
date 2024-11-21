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
Public Class SampleAPI
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
        Public Property TrxThreadaReason As String
        Public Property TrxThreadCustomerName As String
    End Class
    ''1_docalendar.aspx''
    Public Class listDataCalendar
        Public Property titleNya As String
        Public Property startNya As String
        Public Property endNya As String
        Public Property className As String
    End Class

    ''End''
    Public Class resultInsert
        Public Property Result As String
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property ChatID As String
        Public Property msgSystem As String
        Public Property TicketNumber As String
        Public Property CustomerID As String
    End Class
    Public Class listKategori
        Public Property Result As String
        Public Property CategoriID As String
        Public Property CategoriName As String
        Public Property CategoriLevel1ID As String
        Public Property CategoriLevel1Name As String
        Public Property CategoriLevel2ID As String
        Public Property CategoriLevel2Name As String
        Public Property CategoriLevel3ID As String
        Public Property CategoriLevel3Name As String
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
    Public Class listUser
        Public Property Result As String
        Public Property UserName As String
    End Class
    Public Class listOrganization
        Public Property Result As String
        Public Property OrganizationID As String
        Public Property OrganizationName As String
    End Class
    Public Class listCounting
        Public Property Result As String
        Public Property Counting As String
    End Class
    Public Class listCustomer
        Public Property Result As String
        Public Property CustomerID As String
        Public Property CustomerName As String
        Public Property CustomerEmail As String
        Public Property CustomerHP As String
        Public Property CustomerGender As String
        Public Property CustomerBirth As String
        Public Property CustomerCIF As String
        Public Property CustomerNIK As String
        Public Property CustomerAddress As String
        Public Property CustomerTahunlahir As String
        Public Property CustomerBulanlahir As String
        Public Property CustomerHarilahir As String
    End Class
    Public Class listTransaction
        Public Property Result As String
        Public Property TrxID As String
        Public Property TrxCustomerid As String
        Public Property TrxCustomerName As String
        Public Property TrxTicketNumber As String
        Public Property TrxTicketSourceName As String
        Public Property TrxCategoryID As String
        Public Property TrxCategoryName As String
        Public Property TrxLevel1ID As String
        Public Property TrxLevel1Name As String
        Public Property TrxLevel2ID As String
        Public Property TrxLevel2Name As String
        Public Property TrxLevel3ID As String
        Public Property TrxLevel3Name As String
        Public Property TrxDetailComplaint As String
        Public Property TrxResponComplaint As String
        Public Property TrxDivisi As String
        Public Property TrxSLA As String
        Public Property TrxStatus As String
        Public Property TrxUserCreate As String
        Public Property TxtThreadID As String
        Public Property TrxInteractionAccount As String
        Public Property TrxNamaPelapor As String
        Public Property TrxEmailPelapor As String
        Public Property TrxPhonePelapor As String
        Public Property TrxAlamatPelapor As String
        Public Property TrxNomorRekening As String
        Public Property TrxSumberInformasi As String
        Public Property TrxEskalasiUnit As String
        Public Property TrxKejadian As String
        Public Property TrxPenyebab As String
        Public Property TrxStatusPelapor As String
        Public Property TrxPenerimaPengaduan As String
        Public Property TrxSkalaPrioritas As String
        Public Property TrxJenisNasabah As String
        Public Property TrxThreadID As String
        Public Property TrxGenesysID As String
        Public Property TrxExtendID As String
        Public Property TrxExtendSLA As String
        Public Property TrxExtendName As String
        Public Property TrxTicketPosition As String
        Public Property TrxTahun As String
        Public Property TrxBulan As String
        Public Property TrxHari As String
        Public Property TrxReleaseUser As String
        Public Property TrxmsgSystem As String
        Public Property TrxDateCreate As String
        Public Property TrxDateClose As String
    End Class
    Public Class listExtendSLA
        Public Property Result As String
        Public Property TrxExtendSLA As String
        Public Property TrxNameExtend As String
    End Class
    Public Class listEmailOut
        Public Property Result As String
        Public Property TrxBodyHTML As String
        Public Property TrxIVCID As String
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
    Public Function InsertTransactionThread(ByVal TrxChannel As String, ByVal TrxThreadID As String, ByVal TrxNumberid As String, ByVal TrxCustomerID As String, ByVal TrxUsername As String, ByVal TrxAccount As String, ByVal TrxSubject As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_InsertThread"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxChannel", TrxChannel)
                sqlComm.Parameters.AddWithValue("TrxThreadID", TrxThreadID)
                sqlComm.Parameters.AddWithValue("TrxNumberID", TrxNumberid)
                sqlComm.Parameters.AddWithValue("TrxAccount", TrxAccount)
                sqlComm.Parameters.AddWithValue("TrxCustomerID", TrxCustomerID)
                sqlComm.Parameters.AddWithValue("TrxUsername", TrxUsername)
                sqlComm.Parameters.AddWithValue("TrxSubject", TrxSubject)
                sqlComm.Parameters.AddWithValue("TrxType", TrxChannel)
                sqlComm.Parameters.AddWithValue("TrxPhoneChat", TrxAccount)
                'sqlComm.Parameters.AddWithValue("TrxCustomerName", TrxChannel)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_InsertThread " & "'" & TrxChannel & "'," & "'" & TrxThreadID & "'," & "'" & TrxNumberid & "'," & "'" & TrxAccount & "'," & "'" & TrxCustomerID & "'," & "'" & TrxUsername & "'," & "'" & TrxSubject & "'," & "'" & TrxChannel & "'," & "'" & TrxAccount & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Thread Has Been Insert"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_InsertThread " & "'" & TrxChannel & "'," & "'" & TrxThreadID & "'," & "'" & TrxNumberid & "'," & "'" & TrxAccount & "'," & "'" & TrxCustomerID & "'," & "'" & TrxUsername & "'," & "'" & TrxSubject & "'," & "'" & TrxChannel & "'," & "'" & TrxAccount & "'"
            LogSuccess(strLogTime, strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function

    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SelectDataCustomer(ByVal TrxCustomerID As String) As String
        Dim listTickets As List(Of listCustomer) = New List(Of listCustomer)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Dim LevelUser As String = String.Empty
        Try
            strQuery = "Exec SP_SelectDataCustomer '" & TrxCustomerID & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listCustomer = New listCustomer()
                    objectTickets.Result = "True"
                    objectTickets.CustomerID = rdr("CustomerID").ToString()
                    objectTickets.CustomerName = rdr("Name").ToString()
                    objectTickets.CustomerEmail = rdr("Email").ToString()
                    objectTickets.CustomerHP = rdr("HP").ToString()
                    objectTickets.CustomerGender = rdr("JenisKelamin").ToString()
                    objectTickets.CustomerBirth = rdr("Birth").ToString()
                    objectTickets.CustomerCIF = rdr("CIF").ToString()
                    objectTickets.CustomerNIK = rdr("NIK").ToString()
                    objectTickets.CustomerAddress = rdr("Alamat").ToString()
                    objectTickets.CustomerTahunlahir = rdr("tahun").ToString()
                    objectTickets.CustomerBulanlahir = rdr("bulan").ToString()
                    objectTickets.CustomerHarilahir = rdr("hari").ToString()
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
    Public Function SelectHistoryTransaction(ByVal filterData As String) As String
        Dim listTickets As List(Of listTransaction) = New List(Of listTransaction)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "SELECT * FROM tTicket where TicketNumber='" & filterData & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTransaction = New listTransaction()
                    objectTickets.Result = "True"
                    objectTickets.TrxID = rdr("ID").ToString()
                    objectTickets.TrxCustomerid = rdr("NIK").ToString()
                    objectTickets.TrxTicketNumber = rdr("TicketNumber").ToString()
                    objectTickets.TrxTicketSourceName = rdr("TicketSourceName").ToString()
                    objectTickets.TrxCategoryID = rdr("CategoryID").ToString()
                    objectTickets.TrxCategoryName = rdr("CategoryName").ToString()
                    objectTickets.TrxLevel1ID = rdr("SubCategory1ID").ToString()
                    objectTickets.TrxLevel1Name = rdr("SubCategory1Name").ToString()
                    objectTickets.TrxLevel2ID = rdr("SubCategory2ID").ToString()
                    objectTickets.TrxLevel2Name = rdr("SubCategory2Name").ToString()
                    objectTickets.TrxLevel3ID = rdr("SubCategory3ID").ToString()
                    objectTickets.TrxLevel3Name = rdr("SubCategory3Name").ToString()
                    objectTickets.TrxDetailComplaint = rdr("DetailComplaint").ToString()
                    objectTickets.TrxResponComplaint = rdr("ResponComplaint").ToString()
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
    Public Function DataTableTaskboard(ByVal TrxUserName As String, ByVal TrxStatus As String, ByVal TrxLoginTypeAngka As String, ByVal TrxDivisi As String) As String
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','Open','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "exec NEW_Sp_Open '" & TrxUserName & "','" & TrxStatus & "','" & TrxLoginTypeAngka & "','" & TrxDivisi & "'"

                Dim ad As SqlDataAdapter = New SqlDataAdapter(sql, conn)
                Dim ds As DataSet = New DataSet()
                ad.Fill(ds)
                dt = ds.Tables(0)
                conn.Close()
            End Using
        Catch ex As Exception
            LogError(strLogTime, ex, sql)
        Finally
            LogSuccess(strLogTime, sql)
        End Try
        Dim tableJson As String = ConvertDataTabletoString(dt)
        Return tableJson
    End Function
End Class