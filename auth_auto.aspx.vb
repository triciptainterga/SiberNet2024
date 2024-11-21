Imports System
Imports System.Web.UI
Imports System.Data.SqlClient
Imports Microsoft.VisualBasic
Public Class auth_auto
    Inherits System.Web.UI.Page

    Dim Proses As New ClsConn
    Dim sqldr, _reading As SqlDataReader
    Dim sql As String
    Dim valuesatu As Integer = 1
    Dim valuedua As Integer = 2
    Dim valuetiga As Integer = 3
    Dim ValueEmpat As Integer = 4
    Dim valueLima As Integer = 5

    Dim valueTest As Integer = 10
    Dim valueDispatchLayer2 As Integer = 2
    Dim valueDispatchLayer3 As Integer = 3
    Dim valueReassignLayer1 As Integer = 1

    Dim leveluser As String
    Dim value As String
    Dim CountLDAP As String = String.Empty
    Dim Con As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlcon As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim sqlconaux As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim com, sqlcom, sqlcomaux As SqlCommand

    Dim connString As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
    Dim recLDAP As Integer
    Dim recCount As Integer
    Dim _ClassFunction As New WebServiceTransaction
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")
    Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmss")
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Try
        '    Using conn As New SqlConnection(connString)
        '        conn.Open()
        '        Dim cmd As SqlCommand = New SqlCommand("Select COUNT (ID) as LDAPCount from ICC_LDAP_Setting WHERE NA='Y'", conn)
        '        recCount = cmd.ExecuteScalar()
        '    End Using
        'Catch ex As Exception
        '    Response.Write(ex.Message)
        'End Try
        ''recCount = "0"
        'If recCount <> 0 Then
        '    Dim LDAPServer As String = ConfigurationManager.AppSettings("LDAP")
        '    If ValidateActiveDirectoryLogin(LDAPServer, Request.QueryString("user"), Request.QueryString("password")) = True Then
        '        Try
        '            Using conn As New SqlConnection(connString)
        '                conn.Open()
        '                Dim cmd As SqlCommand = New SqlCommand("Select COUNT (UserID) as userID from msUser where UserName=@uservalue", conn)
        '                Dim uservalue As SqlParameter = New SqlParameter("@uservalue", SqlDbType.VarChar, 150)
        '                uservalue.Value = Request.QueryString("user")
        '                cmd.Parameters.Add(uservalue)
        '                recLDAP = cmd.ExecuteScalar()

        '                If recLDAP = 1 Then
        '                    _ClassFunction.LogSuccess(strLogTime, "Login succcess")
        '                    AccessLogin(Request.QueryString("user"))
        '                Else
        '                    _ClassFunction.LogSuccess(strLogTime, "Login failed")
        '                End If
        '            End Using
        '        Catch ex As Exception
        '            Response.Write(ex.Message)
        '        End Try
        '    Else

        '    End If
        'Else
        '    If Request.QueryString("user") <> "" Then
        '        Try
        '            Using conn As New SqlConnection(connString)
        '                conn.Open()
        '                Dim cmd As SqlCommand = New SqlCommand("Select COUNT (UserID) as userID from msUser where UserName=@uservalue", conn)
        '                Dim uservalue As SqlParameter = New SqlParameter("@uservalue", SqlDbType.VarChar, 150)
        '                uservalue.Value = Request.QueryString("user")
        '                cmd.Parameters.Add(uservalue)
        '                recLDAP = cmd.ExecuteScalar()

        '                If recLDAP = 1 Then
        '                    _ClassFunction.LogSuccess(strLogTime, "Login succcess")
        '                    AccessLogin(Request.QueryString("user"))
        '                Else
        '                    _ClassFunction.LogSuccess(strLogTime, "Login failed")
        '                End If

        '            End Using
        '        Catch ex As Exception
        '            Response.Write(ex.Message)
        '        End Try
        '    Else
        '        _ClassFunction.LogSuccess(strLogTime, "Login failed")
        '    End If
        'End If

        Dim TrxParamUser As String = Request.QueryString("user")
        If TrxParamUser <> "" Then
            Dim TrxChannel As String = "Call"
            Dim TrxNumberID As String = "CALL-" + strTime & New Random().Next(1000000, 9999999)
            Dim TrxThreadID As String = strTime & New Random().Next(10000, 99999)
            Dim TrxAccount As String = "085889088095"
            Dim TrxAccountNumber As String = "085889088095"
            Dim TrxUsername As String = "Agent1"
            Dim TrxSubject As String = "-"
            Dim TrxDescription As String = "-"
            Dim TrxPhoneChat As String = "085889088095"
            Dim TrxNumberGUID As String = "CALL-" + Guid.NewGuid().ToString("N")
            _ClassFunction.InsertTransactionThread(TrxChannel, TrxThreadID, TrxNumberGUID, GetValueCustomerID(TrxAccountNumber), TrxUsername, TrxAccount, TrxSubject, TrxDescription)
            Response.Redirect("apps/1_doticket.aspx?id=" + GetValueCustomerID(TrxAccountNumber) + "&channel=" + TrxChannel + "&n=1&threadid=" + TrxThreadID + "&numberid=" + TrxNumberGUID + "&account=" + TrxAccount + "")
        Else

        End If

    End Sub
    Function AccessLogin(ByVal AgentID As String)
        sql = "EXEC SP_LOGIN_APPLIKASI  " & AgentID & ""
        Try
            sqldr = Proses.ExecuteReader(sql)
            If sqldr.HasRows Then
                sqldr.Read()
                leveluser = sqldr("LAYER").ToString
                Session("UserName") = sqldr("UserName").ToString
                Session("lblUserName") = sqldr("UserName").ToString
                Session("UnitKerja") = sqldr("UNITKERJA").ToString
                Session("Org") = sqldr("ORGANIZATION_NAME").ToString
                Session("NameKaryawan") = sqldr("NAME").ToString
                Session("LoginType") = sqldr("LAYER").ToString
                Session("lvluser") = sqldr("LevelUser").ToString
                Session("channel_code") = sqldr("CHANNEL_CODE").ToString
                Session("organization") = sqldr("ORGANIZATION").ToString
                Session("orgSupervisor") = sqldr("ORGANIZATION").ToString
                Session("lokasiPengaduan") = ""
                Session("sessionchat") = sqldr("CHAT").ToString
                Session("unitkerjaagent") = sqldr("IdGrup").ToString
                Session("ROLE") = sqldr("LEVELUSER").ToString
                Session("LEVELUSERID") = sqldr("ROLE_ID").ToString
                Session("LoginTypeAngka") = sqldr("NumberNya").ToString
                Session("_LoginState") = sqldr("LoginState").ToString
                Session("NamaGrup") = sqldr("NamaGrup").ToString
            Else
                Response.Redirect("login.aspx?error=y")
            End If
            sqldr.Close()
            _ClassFunction.LogSuccess(strLogTime, sql)
        Catch ex As Exception
            _ClassFunction.LogError(strLogTime, ex, sql)
            Response.Write(ex.Message)
        End Try

        Dim updlogin As String = String.Empty
        Try
            updlogin = "UPDATE MSUSER SET LOGIN='1', IdAUX='9', DescAUX='READY' WHERE USERNAME ='" & AgentID & "'"
            Proses.ExecuteNonQuery(updlogin)
            _ClassFunction.LogSuccess(strLogTime, updlogin)
        Catch ex As Exception
            _ClassFunction.LogError(strLogTime, ex, updlogin)
            Response.Write(ex.Message)
        End Try

        Dim ilogin As String = "INSERT INTO ICC_LOG_IN (USERID,ACTIVITY_DATE,AUX_DESCRIPTION) VALUES('" & AgentID & "',GETDATE(),'LOGIN')"
        sqlcom = New SqlCommand(ilogin, sqlcon)
        Try
            sqlcon.Open()
            sqlcom.ExecuteNonQuery()
            sqlcon.Close()
            _ClassFunction.LogSuccess(strLogTime, ilogin)
        Catch ex As Exception
            _ClassFunction.LogError(strLogTime, ex, ilogin)
            Response.Write(ex.Message)
        End Try
        Response.Redirect("HTML/mainframe.aspx?agentid=" & Request.QueryString("AgentID") & "&channel=" & Request.QueryString("MediaType") & "&genesysid=" & Request.QueryString("CallUUID") & "&threadid=-&account=" & Request.QueryString("PhoneNumber") & "&accountid=" & Request.QueryString("ContactID") & "&subject=-&phoneChat=0&source=inbound&customerid=")
    End Function
    Private Function ValidateActiveDirectoryLogin(ByVal Domain As String, ByVal Username As String, ByVal Password As String) As Boolean
        Dim Success As Boolean = False
        Dim Entry As New System.DirectoryServices.DirectoryEntry("LDAP://" & Domain, Username, Password)
        Dim Searcher As New System.DirectoryServices.DirectorySearcher(Entry)
        Searcher.SearchScope = DirectoryServices.SearchScope.OneLevel
        Try
            Dim Results As System.DirectoryServices.SearchResult = Searcher.FindOne
            Success = Not (Results Is Nothing)
            _ClassFunction.LogSuccess(strLogTime, "login success, user LDAP exits")
        Catch ex As Exception
            Success = False
            _ClassFunction.LogError(strLogTime, ex, "login failed, user LDAP not found")
        End Try
        Return Success
    End Function
    Function GetValueCustomerID(ByVal _Value As String)
        Dim strSql As String = ""
        strSql = "select CustomerID from SML_mCustomerChannel WHERE ValueChannel='" & _Value & "'"
        sqldr = Proses.ExecuteReader(strSql)
        Try
            If sqldr.HasRows() Then
                sqldr.Read()
                Return sqldr("CustomerID").ToString
            Else
                Return "-"
            End If
            sqldr.Close()
        Catch ex As Exception
            Response.Write(ex.Message)
        End Try
    End Function
End Class