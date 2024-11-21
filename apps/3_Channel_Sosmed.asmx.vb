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
Public Class _3_Channel_Sosmed1
    Inherits System.Web.Services.WebService

    Dim sqlcom As SqlCommand
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim strSql As String
    Dim sqldr As SqlDataReader
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmssfff")
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim TrxEmailForm As String = ConfigurationManager.AppSettings("EmailForm")
    Dim Proses As New ClsConn

    <WebMethod()>
    Public Function HelloWorld() As String
        Return "Hello World"
    End Function
    Public Class Response
        Public Guid As Guid
        Public Toggle As Boolean
        Public DateNya As String
        Public FileName As String
        Public FileExt As String
        Public FileSizing As String
        Public FilePath As String
    End Class
    Public Class resultInsert
        Public Property Result As String
        Public Property UserID As String
        Public Property NamaNya As String
        Public Property msgSystem As String
        Public Property TicketNumber As String
        Public Property CustomerID As String
    End Class
    Public Class resultCustomerProfile
        Public Property Result As String
        Public Property CustomerID As String
        Public Property ProfileName As String
        Public Property CompanyName As String
        Public Property ProfileChannel As String
        Public Property ProfileValue As String
        Public Property ProfileAlamat As String
    End Class
    Public Class listInboxSocialMedia
        Public Property Result As String
        Public Property IDTable As String
        Public Property HeaderSosmed As String
        Public Property DetailSosmed As String
        Public Property FlagTo As String
        Public Property ProfileID As String
        Public Property ProfileName As String
        Public Property Messages As String
        Public Property DateGetSosmed As String
        Public Property DateCreate As String
        Public Property StatusType As String
        Public Property Active As String
        Public Property Total As String
        Public Property Likes As String

    End Class
    Public Class listFileUpload
        Public Property Result As String
        Public Property NameNya As String
        Public Property StatusNya As String
        Public Property FileId As Guid
        Public Property FileExt As String

    End Class
    Public Class listPhotoSocialMedia
        Public Property Result As String
        Public Property IDTable As String
        Public Property HeaderSosmed As String
        Public Property DetailSosmed As String
        Public Property FlagTo As String
        Public Property ProfileID As String
        Public Property ProfileName As String
        Public Property Messages As String
        Public Property DateGetSosmed As String
        Public Property DateCreate As String
        Public Property StatusType As String
        Public Property FileURL As String
        Public Property PhotoID As String


    End Class
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SelectInboxSocialMedia(ByVal FlagTo As String, ByVal AgentLogin As String) As String
        Dim listTickets As List(Of listInboxSocialMedia) = New List(Of listInboxSocialMedia)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Sosmed_GetListInbox '" & FlagTo & "','" & AgentLogin & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listInboxSocialMedia = New listInboxSocialMedia()
                    objectTickets.Result = "True"
                    objectTickets.IDTable = rdr("ID").ToString()
                    objectTickets.HeaderSosmed = rdr("HeaderSosmed").ToString()
                    objectTickets.FlagTo = rdr("FlagTo").ToString()
                    objectTickets.ProfileID = rdr("ProfileID").ToString()
                    objectTickets.ProfileName = rdr("ProfileName").ToString()
                    objectTickets.Messages = rdr("Messages").ToString()
                    objectTickets.DateGetSosmed = rdr("DateGetSosmedString").ToString()
                    objectTickets.DateCreate = rdr("DateCreate").ToString()
                    objectTickets.StatusType = rdr("StatusType").ToString()
                    objectTickets.Active = rdr("Active").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError("Sosmed_GetListInbox_" & HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess("Sosmed_GetListInbox_" & HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataContentInbox(ByVal FlagTo As String, ByVal postid As String) As String
        Dim listTickets As List(Of listInboxSocialMedia) = New List(Of listInboxSocialMedia)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Sosmed_GetListContentInbox '" & FlagTo & "','" & postid & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listInboxSocialMedia = New listInboxSocialMedia()
                    objectTickets.Result = "True"
                    objectTickets.IDTable = rdr("ID").ToString()
                    objectTickets.HeaderSosmed = rdr("HeaderSosmed").ToString()
                    objectTickets.FlagTo = rdr("FlagTo").ToString()
                    objectTickets.ProfileID = rdr("ProfileID").ToString()
                    objectTickets.ProfileName = rdr("ProfileName").ToString()
                    objectTickets.Messages = rdr("Messages").ToString()
                    objectTickets.DateGetSosmed = rdr("DateGetSosmedString").ToString()
                    objectTickets.DateCreate = rdr("DateCreate").ToString()
                    objectTickets.StatusType = rdr("StatusType").ToString()
                    objectTickets.Active = rdr("Active").ToString()
                    objectTickets.Total = rdr("Total").ToString()
                    objectTickets.Likes = rdr("Likes_Count").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError("Sosmed_GetListContentInbox_" & HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess("Sosmed_GetListContentInbox_" & HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function CheckConversationStatus(ByVal ChannelNya As String, ByVal ConvID As String) As String
        Dim listTickets As List(Of listInboxSocialMedia) = New List(Of listInboxSocialMedia)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Sosmed_CheckConversationStatus '" & ChannelNya & "','" & ConvID & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listInboxSocialMedia = New listInboxSocialMedia()
                    objectTickets.Result = rdr("ResultNya").ToString()
                    objectTickets.IDTable = rdr("id").ToString()

                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError("Sosmed_CheckConversationStatus_" & HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess("Sosmed_CheckConversationStatus_" & HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataProfileCustSM(ByVal ValueChannel As String) As String
        Dim listProfiles As List(Of resultCustomerProfile) = New List(Of resultCustomerProfile)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Sosmed_CheckProfile '" & ValueChannel & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()

                    Dim ObjectProfile As resultCustomerProfile = New resultCustomerProfile()
                    ObjectProfile.Result = rdr("ResultNya").ToString()
                    ObjectProfile.CustomerID = rdr("CustomerID").ToString()
                    ObjectProfile.ProfileName = rdr("ProfileName").ToString()
                    ObjectProfile.CompanyName = rdr("CompanyName").ToString()
                    ObjectProfile.ProfileAlamat = rdr("Alamat").ToString()
                    ObjectProfile.ProfileChannel = rdr("FlagChannel").ToString()
                    ObjectProfile.ProfileValue = rdr("ValueChannel").ToString()
                    listProfiles.Add(ObjectProfile)

                End While

            End Using
        Catch ex As Exception
            LogError("Sosmed_CheckProfile_" & HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess("Sosmed_CheckProfile_" & HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listProfiles)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataContentInboxMessage(ByVal FlagTo As String, ByVal postid As String) As String
        Dim listTickets As List(Of listInboxSocialMedia) = New List(Of listInboxSocialMedia)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Sosmed_GetListContentInboxMessage '" & FlagTo & "','" & postid & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listInboxSocialMedia = New listInboxSocialMedia()
                    objectTickets.Result = "True"
                    objectTickets.IDTable = rdr("ID").ToString()
                    objectTickets.HeaderSosmed = rdr("ChatID").ToString()
                    objectTickets.FlagTo = rdr("TypeUser").ToString()
                    objectTickets.ProfileID = rdr("SenderID").ToString()
                    objectTickets.ProfileName = rdr("SenderName").ToString()
                    objectTickets.Messages = rdr("Messages").ToString()
                    objectTickets.DateGetSosmed = rdr("DateNya").ToString()
                    objectTickets.DateCreate = rdr("DateNya").ToString()
                    objectTickets.StatusType = rdr("ChatType").ToString()
                    objectTickets.Total = rdr("Total").ToString()
                    objectTickets.DetailSosmed = rdr("CustomerPicURL").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError("Sosmed_GetListContentInboxMessage_" & HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess("Sosmed_GetListContentInboxMessage_" & HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataContentCommentInbox(ByVal FlagTo As String, ByVal postid As String) As String
        Dim listTickets As List(Of listInboxSocialMedia) = New List(Of listInboxSocialMedia)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Sosmed_GetListContentInboxComment '" & FlagTo & "','" & postid & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listInboxSocialMedia = New listInboxSocialMedia()
                    objectTickets.Result = "True"
                    objectTickets.IDTable = rdr("ID").ToString()
                    objectTickets.HeaderSosmed = rdr("HeaderSosmed").ToString()
                    objectTickets.DetailSosmed = rdr("DetailSosmed").ToString()
                    objectTickets.FlagTo = rdr("FlagTo").ToString()
                    objectTickets.ProfileID = rdr("ProfileID").ToString()
                    objectTickets.ProfileName = rdr("ProfileName").ToString()
                    objectTickets.Messages = rdr("Messages").ToString()
                    objectTickets.DateGetSosmed = rdr("DateGetSosmedString").ToString()
                    objectTickets.DateCreate = rdr("DateCreate").ToString()
                    objectTickets.StatusType = rdr("StatusType").ToString()
                    objectTickets.Active = rdr("Active").ToString()
                    objectTickets.Total = rdr("Total").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError("Sosmed_GetListContentInboxComment_" & HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess("Sosmed_GetListContentInboxComment_" & HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataContentCommentReplyInbox(ByVal postid As String, ByVal commentid As String) As String
        Dim listTickets As List(Of listInboxSocialMedia) = New List(Of listInboxSocialMedia)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Sosmed_GetListContentInboxCommentReply '" & postid & "','" & commentid & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listInboxSocialMedia = New listInboxSocialMedia()
                    objectTickets.Result = "True"
                    objectTickets.IDTable = rdr("ID").ToString()
                    objectTickets.HeaderSosmed = rdr("HeaderSosmed").ToString()
                    objectTickets.DetailSosmed = rdr("DetailSosmedReply").ToString()
                    objectTickets.FlagTo = rdr("FlagTo").ToString()
                    objectTickets.ProfileID = rdr("ProfileID").ToString()
                    objectTickets.ProfileName = rdr("ProfileName").ToString()
                    objectTickets.Messages = rdr("Messages").ToString()
                    objectTickets.DateGetSosmed = rdr("DateGetSosmedString").ToString()
                    objectTickets.DateCreate = rdr("DateCreate").ToString()
                    objectTickets.StatusType = rdr("StatusType").ToString()
                    objectTickets.Active = rdr("Active").ToString()
                    objectTickets.Total = "0"
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError("Sosmed_GetListContentInboxCommentReply_" & HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess("Sosmed_GetListContentInboxCommentReply_" & HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataContentCommentPhoto(ByVal postid As String) As String
        Dim listTickets As List(Of listPhotoSocialMedia) = New List(Of listPhotoSocialMedia)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Sosmed_GetPhotoContentInboxComment '" & postid & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listPhotoSocialMedia = New listPhotoSocialMedia()
                    objectTickets.Result = "True"
                    objectTickets.IDTable = rdr("ID").ToString()
                    objectTickets.HeaderSosmed = rdr("HeaderSosmed").ToString()
                    objectTickets.DetailSosmed = rdr("DetailSosmed").ToString()
                    objectTickets.FlagTo = rdr("FlagTo").ToString()
                    objectTickets.ProfileID = rdr("ProfileID").ToString()
                    objectTickets.ProfileName = rdr("ProfileName").ToString()
                    objectTickets.Messages = rdr("Messages").ToString()
                    objectTickets.DateGetSosmed = rdr("DateGetSosmedString").ToString()
                    objectTickets.DateCreate = rdr("DateCreate").ToString()
                    objectTickets.StatusType = rdr("SourceSocmed").ToString()
                    objectTickets.PhotoID = rdr("DetailSosmed").ToString()
                    objectTickets.FileURL = rdr("FileURL").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError("Sosmed_GetPhotoContentInboxComment_" & HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess("Sosmed_GetPhotoContentInboxComment_" & HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataListMessage(ByVal FlagTo As String, ByVal postid As String) As String
        Dim listTickets As List(Of listPhotoSocialMedia) = New List(Of listPhotoSocialMedia)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Sosmed_GetListMessage '" & FlagTo & "',''"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listPhotoSocialMedia = New listPhotoSocialMedia()
                    objectTickets.Result = "True"
                    objectTickets.ProfileID = rdr("SenderID").ToString()
                    objectTickets.ProfileName = rdr("SenderName").ToString()
                    objectTickets.Messages = rdr("ChatType").ToString()
                    objectTickets.FileURL = rdr("CustomerPicURL").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError("Sosmed_GetListMessage_" & HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess("Sosmed_GetListMessage_" & HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function InsertSocialMediaReason(ByVal TrxReason As String, ByVal TrxSocmedID As String, ByVal TrxSocmed As String, ByVal TrxSocmedSource As String, ByVal TrxSocmedSourceDetail As String, ByVal TrxSocmedActionDo As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_ActionDoInsert"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("DescAction", HttpUtility.UrlDecode(TrxReason))
                sqlComm.Parameters.AddWithValue("SocmedID", TrxSocmedID)
                sqlComm.Parameters.AddWithValue("Socmed", TrxSocmed)
                sqlComm.Parameters.AddWithValue("SocmedSource", TrxSocmedSource)
                sqlComm.Parameters.AddWithValue("SocmedSourceDetail", TrxSocmedSourceDetail)
                sqlComm.Parameters.AddWithValue("SocmedActionDo", TrxSocmedActionDo)
                sqlComm.Parameters.AddWithValue("UserCreate", TrxUserName)


                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False Data Note Reason Social"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_ActionDoInsert " & "'" & HttpUtility.UrlDecode(TrxReason) & "'," & "'" & TrxSocmedID & "'," & "'" & TrxSocmed & "','" & TrxSocmedSource & "','" & TrxSocmedSourceDetail & "','" & TrxSocmedActionDo & "','" & TrxUserName & "'"
            LogError("UIDESK_Temp_ActionDoInsert_" & HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Note Reason Social Has Been Insert"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_ActionDoInsert " & "'" & HttpUtility.UrlDecode(TrxReason) & "'," & "'" & TrxSocmedID & "'," & "'" & TrxSocmed & "','" & TrxSocmedSource & "','" & TrxSocmedSourceDetail & "','" & TrxSocmedActionDo & "','" & TrxUserName & "'"
            LogSuccess("UIDESK_Temp_ActionDoInsert_" & HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function SyncDatabaseChannelCust(ByVal sourcedo As String, ByVal valuechannel As String, ByVal namauser As String, ByVal flagdata As String, ByVal emaildata As String, ByVal leadsid As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_SyncDataCustChannel"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("sourcedo", sourcedo)
                sqlComm.Parameters.AddWithValue("valuechannel", valuechannel)
                sqlComm.Parameters.AddWithValue("namauser", namauser)
                sqlComm.Parameters.AddWithValue("flagdata", flagdata)
                sqlComm.Parameters.AddWithValue("emaildata", emaildata)
                sqlComm.Parameters.AddWithValue("leadsid", leadsid)

                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False Data WA update"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_SyncDataCustChannel " & "'" & sourcedo & "','" & valuechannel & "'," & "'" & namauser & "'"
            LogError("UIDESK_Temp_SyncDataCustChannel_" & HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data WA Update Has Been Updated"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_SyncDataCustChannel " & "'" & sourcedo & "','" & valuechannel & "'," & "'" & namauser & "'"
            LogSuccess("UIDESK_Temp_SyncDataCustChannel_" & HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function UpdateDataDBWA(ByVal waaccount As String, ByVal namauser As String, ByVal flagdata As String, ByVal emaildata As String, ByVal leadsid As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_Temp_UpdateDBWA"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("waaccount", waaccount)
                sqlComm.Parameters.AddWithValue("namauser", namauser)
                sqlComm.Parameters.AddWithValue("flagdata", flagdata)
                sqlComm.Parameters.AddWithValue("emaildata", emaildata)
                sqlComm.Parameters.AddWithValue("leadsid", leadsid)

                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False Data WA update"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_UpdateDBWA " & "'" & waaccount & "'," & "'" & namauser & "'"
            LogError("UIDESK_Temp_UpdateDBWA_" & HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data WA Update Has Been Updated"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_Temp_UpdateDBWA " & "'" & waaccount & "'," & "'" & namauser & "'"
            LogSuccess("UIDESK_Temp_UpdateDBWA_" & HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    ''Restu Dev 10-10-21
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function insertDataChannel(ByVal strTrxUserName As String, ByVal strTrxCustomerID As String, ByVal strTrxChannelValue As String, ByVal strTrxChannelType As String) As String
        Dim listTickets As List(Of listPhotoSocialMedia) = New List(Of listPhotoSocialMedia)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec UIDESK_Temp_InsertOtherChannel '" & strTrxUserName & "','" & strTrxCustomerID & "','" & strTrxChannelValue & "','" & strTrxChannelType & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listPhotoSocialMedia = New listPhotoSocialMedia()
                    objectTickets.Result = rdr("ResultNya").ToString()
                    objectTickets.ProfileID = rdr("CustomerID").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError("UIDESK_Temp_InsertOtherChannel_" & HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess("UIDESK_Temp_InsertOtherChannel_" & HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    ''End
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function MessageWAreply(ByVal nomor As String, ByVal msgbody As String, ByVal toUser As String, ByVal mediaURL As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Sosmed_MsgWaReply '" & nomor & "','" & msgbody & "','" & toUser & "','" & mediaURL & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As resultInsert = New resultInsert()
                    objectTickets.Result = "True"
                    objectTickets.msgSystem = rdr("ResponseTrue").ToString()

                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            LogError("Sosmed_MsgWaReply_" & HttpContext.Current.Session("UserName"), ex, strQuery)
        Finally
            LogSuccess("Sosmed_MsgWaReply_" & HttpContext.Current.Session("UserName"), strQuery)
        End Try

        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
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
    <WebMethod>
    Public Function UploadFileAttachmentTicket() As Response
        Dim Response As Response = New Response()
        Dim listTickets As List(Of listFileUpload) = New List(Of listFileUpload)()
        'Dim ItemId As Guid = Guid.Parse(HttpContext.Current.Request.Form("id"))
        Dim SavePath As String = HttpContext.Current.Server.MapPath("~/apps/attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy") & "/")
        Dim TrxUserCreate As String = HttpContext.Current.Request.Form("Username")
        Dim TrxNumberID As String = HttpContext.Current.Request.Form("numberid")
        Dim TrxCustomerID As String = HttpContext.Current.Request.Form("customerid")
        'Dim idTable As String = HttpContext.Current.Request.Form("idTable")
        Dim Files As HttpFileCollection = HttpContext.Current.Request.Files
        Dim FileName As String = String.Empty
        Dim FileExt As String = String.Empty
        Dim FileSizing As String = String.Empty
        Dim FileId As Guid

        Dim DirectoryX As String = Path.Combine(Server.MapPath("~/apps/attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy")))
        If Not System.IO.Directory.Exists(DirectoryX) Then
            System.IO.Directory.CreateDirectory(DirectoryX)
        End If
        Dim FilePathNya = ""
        For i As Integer = 0 To Files.Count - 1
            Dim File As HttpPostedFile = Files(i)
            FileId = Guid.NewGuid()
            FileName = File.FileName
            FileExt = Path.GetExtension(File.FileName)
            FileSizing = File.ContentLength

            Dim FileMod As DateTime = DateTime.Now
            Dim FileType As String = File.ContentType
            Dim FileSize As Long = File.ContentLength / 1024
            FilePathNya = "apps/attachment/" & strLogTime & "/" & DateTime.Now.ToString("ddMMyyyy") & "/"
            File.SaveAs(Path.Combine(SavePath, String.Concat(FileId, FileExt)))
            'File.SaveAs(Path.Combine("c:\\FileBlast\\", String.Concat(FileId, FileExt)))

        Next
        Response.Guid = FileId
        Response.FileName = FileName
        Response.FileExt = FileExt
        Response.FileSizing = FileSizing
        Response.FilePath = FilePathNya


        Return Response

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
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function DirectTicketPage(ByVal TrxParam As String, ByVal TrxSource As String, ByVal TrxValue As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        'exec [dbo].[webhuk_tr] '[TWmentionpage]1513685222428094466[/TWmentionpage]'
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "UIDESK_DIRECT_TICKET"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("GetTR_Response", TrxParam)
                sqlComm.Parameters.AddWithValue("UIDESK_Username", TrxUserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_DIRECT_TICKET " & "'" & TrxParam & "'," & "'" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data Direct Ticket"
            listTickets.Add(objectTickets)
            strExec = "exec UIDESK_DIRECT_TICKET " & "'" & TrxParam & "'," & "'" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function EndChat(ByVal TrxValue As String, ByVal TrxUserName As String) As String
        Dim listTickets As List(Of resultInsert) = New List(Of resultInsert)()
        Dim strExec As String = String.Empty
        Dim constr As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Try
            Using con As New SqlConnection(constr)
                Dim sqlComm As New SqlCommand()
                sqlComm.Connection = con
                sqlComm.CommandText = "Sosmed_CreateConvID"
                sqlComm.CommandType = CommandType.StoredProcedure
                sqlComm.Parameters.AddWithValue("ChatID", ReplaceSpecialLetter(TrxValue))
                sqlComm.Parameters.AddWithValue("Agentname", TrxUserName)
                con.Open()
                sqlComm.ExecuteNonQuery()
            End Using
        Catch ex As Exception
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "False"
            objectTickets.msgSystem = ex.Message()
            listTickets.Add(objectTickets)
            strExec = "exec Sosmed_CreateConvID '" & ReplaceSpecialLetter(TrxValue) & "','" & TrxUserName & "'"
            LogError(HttpContext.Current.Session("UserName"), ex, strExec)
        Finally
            Dim objectTickets As resultInsert = New resultInsert()
            objectTickets.Result = "True"
            objectTickets.msgSystem = "Data End Chat"
            listTickets.Add(objectTickets)
            strExec = "exec Sosmed_CreateConvID '" & ReplaceSpecialLetter(TrxValue) & "','" & TrxUserName & "'"
            LogSuccess(HttpContext.Current.Session("UserName"), strExec)
            ''End
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    Public Function ReplaceSpecialLetter(ByVal str As String)
        Dim TmpStr As String
        TmpStr = str
        TmpStr = Replace(TmpStr, "/", "")
        Return TmpStr
    End Function
End Class
