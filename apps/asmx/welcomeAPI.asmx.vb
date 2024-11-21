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
Imports System.Net.WebClient
' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
<ScriptService()>
<ToolboxItem(False)>
Public Class welcomeAPI1
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
    Public Class listCounting
        Public Property Result As String
        Public Property Counting As String
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
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function API_InsertHeader(ByVal call_name As String, ByVal call_jenis_kelamin As String, ByVal call_nama_product As String, ByVal call_polis_number As String,
                                     ByVal call_nama_tertanggung As String, ByVal call_uang_pertanggungan As String, ByVal call_premi_dasar_berkala As String,
                                    ByVal call_premi_topup As String, ByVal call_cara_bayar As String, ByVal call_tanggal_debet As String, ByVal call_nama_tenaga_penjualan As String,
                                    ByVal call_biaya_akuisisi_1 As String, ByVal call_biaya_akuisisi_2 As String, ByVal call_nominal_COI As String, ByVal call_nominal_COR As String,
                                    ByVal call_email As String, ByVal call_phone_number As String, ByVal call_flaging_nasabah As String, ByVal call_biaya_akuisisi_1_add As String,
                                    ByVal call_biaya_akuisisi_2_add As String, ByVal call_biaya_akuisisi_3_add As String, ByVal call_biaya_akuisisi_4_add As String,
                                    ByVal call_biaya_akuisisi_5_add As String, ByVal call_product_id As String, ByVal call_username As String, ByVal call_upload_id As String,
                                     ByVal call_jumlah_data As String) As String
        Dim _streXecute As String = String.Empty
        Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constring)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxOutbound_API_InsertHeader_Example"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_name", call_name)
                sqlComm.Parameters.AddWithValue("call_email", call_email)
                sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
                sqlComm.Parameters.AddWithValue("call_phone_number", call_phone_number)
                sqlComm.Parameters.AddWithValue("call_nama_product", call_nama_product)
                sqlComm.Parameters.AddWithValue("call_nama_tertanggung", call_nama_tertanggung)
                sqlComm.Parameters.AddWithValue("call_uang_pertanggungan", call_uang_pertanggungan)
                sqlComm.Parameters.AddWithValue("call_premi_dasar_berkala", call_premi_dasar_berkala)
                sqlComm.Parameters.AddWithValue("call_premi_topup", call_premi_topup)
                sqlComm.Parameters.AddWithValue("call_cara_bayar", call_cara_bayar)
                sqlComm.Parameters.AddWithValue("call_tanggal_debet", call_tanggal_debet)
                sqlComm.Parameters.AddWithValue("call_nama_tenaga_penjualan", call_nama_tenaga_penjualan)
                sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_1", call_biaya_akuisisi_1)
                sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_2", call_biaya_akuisisi_2)
                sqlComm.Parameters.AddWithValue("call_nominal_COI", call_nominal_COI)
                sqlComm.Parameters.AddWithValue("call_nominal_COR", call_nominal_COR)
                sqlComm.Parameters.AddWithValue("call_jenis_kelamin", call_jenis_kelamin)
                sqlComm.Parameters.AddWithValue("call_flaging_nasabah", call_flaging_nasabah)
                sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_1_add", call_biaya_akuisisi_1_add)
                sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_2_add", call_biaya_akuisisi_2_add)
                sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_3_add", call_biaya_akuisisi_3_add)
                sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_4_add", call_biaya_akuisisi_4_add)
                sqlComm.Parameters.AddWithValue("call_biaya_akuisisi_5_add", call_biaya_akuisisi_5_add)
                sqlComm.Parameters.AddWithValue("call_product_id", call_product_id)
                sqlComm.Parameters.AddWithValue("call_username", call_username)
                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
                sqlComm.Parameters.AddWithValue("call_jumlah_data", call_jumlah_data)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertHeader_Example '" & call_name & "','" & call_email & "','" & call_polis_number & "','" & call_phone_number & "','" & call_nama_product & "','" & call_nama_tertanggung & "','" & call_uang_pertanggungan & "'" &
                              "'" & call_premi_dasar_berkala & "','" & call_premi_topup & "','" & call_cara_bayar & "','" & call_tanggal_debet & "','" & call_nama_tenaga_penjualan & "','" & call_biaya_akuisisi_1 & "','" & call_biaya_akuisisi_2 & "'" &
                              "'" & call_nominal_COI & "','" & call_nominal_COR & "','" & call_jenis_kelamin & "','" & call_flaging_nasabah & "', " &
                              "'" & call_biaya_akuisisi_1_add & "','" & call_biaya_akuisisi_2_add & "','" & call_biaya_akuisisi_3_add & "','" & call_biaya_akuisisi_4_add & "', '" & call_biaya_akuisisi_5_add & "'," &
                              " '" & call_product_id & "','" & call_username & "','" & call_upload_id & "','" & call_jumlah_data & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, _streXecute)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertHeader_Example '" & call_name & "','" & call_email & "','" & call_polis_number & "','" & call_phone_number & "','" & call_nama_product & "','" & call_nama_tertanggung & "','" & call_uang_pertanggungan & "'" &
                              "'" & call_premi_dasar_berkala & "','" & call_premi_topup & "','" & call_cara_bayar & "','" & call_tanggal_debet & "','" & call_nama_tenaga_penjualan & "','" & call_biaya_akuisisi_1 & "','" & call_biaya_akuisisi_2 & "'" &
                              "'" & call_nominal_COI & "','" & call_nominal_COR & "','" & call_jenis_kelamin & "','" & call_flaging_nasabah & "', " &
                              "'" & call_biaya_akuisisi_1_add & "','" & call_biaya_akuisisi_2_add & "','" & call_biaya_akuisisi_3_add & "','" & call_biaya_akuisisi_4_add & "', '" & call_biaya_akuisisi_5_add & "'," &
                              " '" & call_product_id & "','" & call_username & "','" & call_upload_id & "','" & call_jumlah_data & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), _streXecute)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTransaksi)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function API_InsertWaris(ByVal call_upload_id As String, ByVal call_polis_number As String, ByVal call_nama_ahli_waris As String, ByVal call_username As String) As String
        Dim _streXecute As String = String.Empty
        Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constring)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxOutbound_API_InsertWaris_Example"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
                sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
                sqlComm.Parameters.AddWithValue("call_nama_ahli_waris", call_nama_ahli_waris)
                sqlComm.Parameters.AddWithValue("call_username", call_username)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertWaris_Example '" & call_upload_id & "','" & call_polis_number & "','" & call_nama_ahli_waris & "','" & call_username & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, _streXecute)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertWaris_Example '" & call_upload_id & "','" & call_polis_number & "','" & call_nama_ahli_waris & "','" & call_username & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), _streXecute)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTransaksi)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function API_InsertRider(ByVal call_upload_id As String, ByVal call_polis_number_rider As String, ByVal call_manfaat As String, ByVal call_nominal As String, ByVal call_username As String) As String
        Dim _streXecute As String = String.Empty
        Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constring)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxOutbound_API_InsertRider_Example"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
                sqlComm.Parameters.AddWithValue("call_polis_number_rider", call_polis_number_rider)
                sqlComm.Parameters.AddWithValue("call_manfaat", call_manfaat)
                sqlComm.Parameters.AddWithValue("call_nominal", call_nominal)
                sqlComm.Parameters.AddWithValue("call_username", call_username)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertRider_Example '" & call_upload_id & "','" & call_polis_number_rider & "','" & call_manfaat & "','" & call_nominal & "','" & call_username & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, _streXecute)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertRider_Example '" & call_upload_id & "','" & call_polis_number_rider & "','" & call_manfaat & "','" & call_nominal & "','" & call_username & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), _streXecute)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTransaksi)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function API_InsertFund(ByVal call_upload_id As String, ByVal call_polis_number As String, ByVal call_jenis_investasi As String,
                                   ByVal call_persentase As String, ByVal call_username As String) As String
        Dim _streXecute As String = String.Empty
        Dim listTransaksi As List(Of resultInsert) = New List(Of resultInsert)()
        Dim constring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constring)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxOutbound_API_InsertFund_Example"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
                sqlComm.Parameters.AddWithValue("call_polis_number", call_polis_number)
                sqlComm.Parameters.AddWithValue("call_jenis_investasi", call_jenis_investasi)
                sqlComm.Parameters.AddWithValue("call_persentase", call_persentase)
                sqlComm.Parameters.AddWithValue("call_username", call_username)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertFund_Example '" & call_upload_id & "','" & call_polis_number & "','" & call_jenis_investasi & "','" & call_persentase & "','" & call_username & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, _streXecute)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            listTransaksi.Add(objectTickets)
            _streXecute = "exec UIDESK_TrxOutbound_API_InsertFund_Example '" & call_upload_id & "','" & call_polis_number & "','" & call_jenis_investasi & "','" & call_persentase & "','" & call_username & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), _streXecute)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTransaksi)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function API_HeaderSummary(ByVal call_upload_id As String, ByVal call_username As String, ByVal call_type As String, ByVal call_summary As String) As String
        Dim _strHeader As String = String.Empty
        Dim _listHeader As List(Of resultInsert) = New List(Of resultInsert)()
        Dim _Result As String = String.Empty
        Dim constringHeader As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constringHeader)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_ExecuteSummary"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
                sqlComm.Parameters.AddWithValue("call_username", call_username)
                sqlComm.Parameters.AddWithValue("call_upload_type", call_type)
                sqlComm.Parameters.AddWithValue("call_summary", call_summary)
                con.Open()
                sqldr = sqlComm.ExecuteReader()
                While sqldr.Read()
                    _Result &= sqldr("call_upload_rows").ToString
                End While
                sqldr.Close()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = _Result
            _listHeader.Add(objectTickets)
            _strHeader = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & call_upload_id & "','" & call_username & "','Polis','" & call_summary & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, _strHeader)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = _Result
            _listHeader.Add(objectTickets)
            _strHeader = "exec UIDESK_TrxUploadOutboundCall_ExecuteSummary '" & call_upload_id & "','" & call_username & "','Polis','" & call_summary & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), _strHeader)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(_listHeader)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateUploadOutboundCall(ByVal call_upload_id As String, ByVal call_approve_by As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_Done"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
                sqlComm.Parameters.AddWithValue("call_approve_by", call_approve_by)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUploadOutboundCall_Done '" & call_upload_id & "','" & call_approve_by & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUploadOutboundCall_Done '" & call_upload_id & "','" & call_approve_by & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function CancelUploadOutboundCall(ByVal call_upload_id As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim _CustomerID As String = String.Empty
        Dim _Result As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_TrxUploadOutboundCall_Cancel"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("call_upload_id", call_upload_id)
                con.Open()
                sqlComm.ExecuteNonQuery()
                con.Close()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUploadOutboundCall_Cancel '" & call_upload_id & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_TrxUploadOutboundCall_Cancel '" & call_upload_id & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function CheckingHeader(ByVal TrxUploadID As String, ByVal TrxUserName As String) As String
        Dim DateNow As String = DateTime.Now.ToString("yyyy-MM-dd")
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "select * from UIDESK_TrxOutboundHeader where call_upload_id='" & TrxUploadID & "'"

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
    Public Function CheckingHeaderTanggal(ByVal TrxUserName As String) As String
        Dim DateNow As String = DateTime.Now.ToString("yyyy-MM-dd")
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "select * from UIDESK_TrxOutboundHeader where call_created_date between '" & DateNow & " 00:01' And '" & DateNow & " 23:59'"

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
    Public Function CheckingHeaderCounting(ByVal TrxUploadID As String, ByVal TrxUserName As String) As String
        Dim DateNow As String = DateTime.Now.ToString("yyyy-MM-dd")
        Dim connstring As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim dt As DataTable = New DataTable()
        Dim sql As String = ""
        'exec NEW_Sp_Open 'Agent1','','1','1'
        Try
            Using conn As SqlConnection = New SqlConnection(connstring)
                conn.Open()

                sql = "select call_upload_rows from UIDESK_TrxOutbound_Summary where call_upload_id='" & TrxUploadID & "' and call_upload_type='Data Polis Number'"

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
End Class