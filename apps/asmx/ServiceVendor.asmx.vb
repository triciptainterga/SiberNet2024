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

<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
<ScriptService()>
<ToolboxItem(False)> _
Public Class ServiceVendor
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
        Public Property ChatID As String
        Public Property msgSystem As String
        Public Property TicketNumber As String
        Public Property CustomerID As String
        Public Property TrxmsgSystem As String
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
        Public FileSizing As String
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
        Public Property ChannelValue As String
        Public Property ChannelType As String
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
    Public Function InsertTransactionVendor(ByVal TrxCompanyName As String, ByVal TrxPhoneNumber As String, ByVal TrxEmail As String,
                                            ByVal TrxWANumber As String, ByVal TrxAddress As String, ByVal TrxPICPhoneNumber As String,
                                            ByVal TrxStatus As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Result As String = String.Empty
        Dim _ValueNya As String = String.Empty
        Dim TrxAction As String = "Insert"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxVendor"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", "0")
                sqlComm.Parameters.AddWithValue("TrxCompanyName", TrxCompanyName)
                sqlComm.Parameters.AddWithValue("TrxPhoneNumber", TrxPhoneNumber)
                sqlComm.Parameters.AddWithValue("TrxEmail", TrxEmail)
                sqlComm.Parameters.AddWithValue("TrxWANumber", TrxWANumber)
                sqlComm.Parameters.AddWithValue("TrxAddress", HttpUtility.UrlDecode(TrxAddress))
                sqlComm.Parameters.AddWithValue("TrxPICPhoneNumber", TrxPICPhoneNumber)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _ValueNya &= sqldr("ValueNya").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxVendor '0','" & TrxCompanyName & "','" & TrxPhoneNumber & "','" & TrxEmail & "','" & TrxWANumber & "','" & HttpUtility.UrlDecode(TrxAddress) & "','" & TrxPICPhoneNumber & "','" & TrxStatus & "','" & TrxUserName & "','" & TrxAction & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Vendor Has Been Save"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxVendor '0','" & TrxCompanyName & "','" & TrxPhoneNumber & "','" & TrxEmail & "','" & TrxWANumber & "','" & HttpUtility.UrlDecode(TrxAddress) & "','" & TrxPICPhoneNumber & "','" & TrxStatus & "','" & TrxUserName & "','" & TrxAction & "'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxmsgSystem = _ValueNya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxVendor '0','" & TrxCompanyName & "','" & TrxPhoneNumber & "','" & TrxEmail & "','" & TrxWANumber & "','" & HttpUtility.UrlDecode(TrxAddress) & "','" & TrxPICPhoneNumber & "','" & TrxStatus & "','" & TrxUserName & "','" & TrxAction & "'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, _ValueNya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateTransactionVendor(ByVal TrxID As String, ByVal TrxCompanyName As String, ByVal TrxPhoneNumber As String, ByVal TrxEmail As String,
                                            ByVal TrxWANumber As String, ByVal TrxAddress As String, ByVal TrxPICPhoneNumber As String,
                                            ByVal TrxStatus As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Result As String = String.Empty
        Dim _ValueNya As String = String.Empty
        Dim TrxAction As String = "Update"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxVendor"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxCompanyName", TrxCompanyName)
                sqlComm.Parameters.AddWithValue("TrxPhoneNumber", TrxPhoneNumber)
                sqlComm.Parameters.AddWithValue("TrxEmail", TrxEmail)
                sqlComm.Parameters.AddWithValue("TrxWANumber", TrxWANumber)
                sqlComm.Parameters.AddWithValue("TrxAddress", HttpUtility.UrlDecode(TrxAddress))
                sqlComm.Parameters.AddWithValue("TrxPICPhoneNumber", TrxPICPhoneNumber)
                sqlComm.Parameters.AddWithValue("TrxStatus", TrxStatus)
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _ValueNya &= sqldr("ValueNya").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxVendor '" & TrxID & "','" & TrxCompanyName & "','" & TrxPhoneNumber & "','" & TrxEmail & "','" & TrxWANumber & "','" & HttpUtility.UrlDecode(TrxAddress) & "','" & TrxPICPhoneNumber & "','" & TrxStatus & "','" & TrxUserName & "','" & TrxAction & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Vendor Has Been Update"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxVendor '" & TrxID & "','" & TrxCompanyName & "','" & TrxPhoneNumber & "','" & TrxEmail & "','" & TrxWANumber & "','" & HttpUtility.UrlDecode(TrxAddress) & "','" & TrxPICPhoneNumber & "','" & TrxStatus & "','" & TrxUserName & "','" & TrxAction & "'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxmsgSystem = _ValueNya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxVendor '" & TrxID & "','" & TrxCompanyName & "','" & TrxPhoneNumber & "','" & TrxEmail & "','" & TrxWANumber & "','" & HttpUtility.UrlDecode(TrxAddress) & "','" & TrxPICPhoneNumber & "','" & TrxStatus & "','" & TrxUserName & "','" & TrxAction & "'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, _ValueNya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DeleteTransactionVendor(ByVal TrxID As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _Result As String = String.Empty
        Dim _ValueNya As String = String.Empty
        Dim TrxAction As String = "Delete"
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxVendor"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("TrxID", TrxID)
                sqlComm.Parameters.AddWithValue("TrxCompanyName", "0")
                sqlComm.Parameters.AddWithValue("TrxPhoneNumber", "0")
                sqlComm.Parameters.AddWithValue("TrxEmail", "0")
                sqlComm.Parameters.AddWithValue("TrxWANumber", "0")
                sqlComm.Parameters.AddWithValue("TrxAddress", "0")
                sqlComm.Parameters.AddWithValue("TrxPICPhoneNumber", "0")
                sqlComm.Parameters.AddWithValue("TrxStatus", "0")
                sqlComm.Parameters.AddWithValue("TrxUserName", TrxUserName)
                sqlComm.Parameters.AddWithValue("TrxAction", TrxAction)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("ResultNya").ToString
                    _ValueNya &= sqldr("ValueNya").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.TrxmsgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxVendor '" & TrxID & "','0','0','0','0','0','0','0','" & TrxUserName & "','" & TrxAction & "'"
            LogError(strLogTime, ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            If _Result = "Success" Then
                objectTickets.Result = "True"
                objectTickets.TrxmsgSystem = "Data Vendor Has Been Delete"
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxVendor '" & TrxID & "','0','0','0','0','0','0','0','" & TrxUserName & "','" & TrxAction & "'"
                LogSuccess(strLogTime, strExec)
            Else
                objectTickets.Result = "False"
                objectTickets.TrxmsgSystem = _ValueNya
                listTickets.Add(objectTickets)
                strExec = "exec UIDESK_TrxVendor '" & TrxID & "','0','0','0','0','0','0','0','" & TrxUserName & "','" & TrxAction & "'"
                LogSuccess(strLogTime, strExec)
                LogSuccess(strLogTime, _ValueNya)
            End If
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class