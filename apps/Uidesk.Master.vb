Imports System
Imports System.IO
Imports System.Data
Imports System.Data.SqlClient
Imports System.Security.Cryptography
Public Class Uidesk
    Inherits System.Web.UI.MasterPage

    Dim _ClassFunction As New WebServiceTransaction
    Dim _sqlconn, _sqlconnect, _sqlconnections As New SqlConnection(ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString)
    Dim _read, _reader, _reading, _sqlreader As SqlDataReader
    Dim _sqlcomm, _sqlcommands, _sqlcommander As SqlCommand
    Dim _strsql, _strselect, _strsqlselect As String
    Dim _write As String
    Dim _ClassAux As New TrmAux
    Dim Proses As New ClsConn
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim TrxCookiesUserName As String = String.Empty
        Dim VariabelCookiesUsername As HttpCookie = HttpContext.Current.Request.Cookies("CookiesUserName")
        TrxCookiesUserName = If(VariabelCookiesUsername IsNot Nothing, VariabelCookiesUsername.Value.Split("="c)(1), "undefined")
        If Session("UserName") = "" Then
            Response.Redirect("../auth_login.aspx")
        Else
            If TrxCookiesUserName = "undefined" Then
                Response.Redirect("~/auth_login.aspx")
            Else
                _PageSession()
                _PageMastering()
                Dim MidCurrentPage As String = System.IO.Path.GetFileName(Request.Url.AbsolutePath)
                If Request.QueryString("mid") Is Nothing Then
                    'Response.Write("currentPage " + MidCurrentPage)
                    If Session("lvluser") = "Layer 1" Then
                        Dim strSqlChannel As String = "SELECT * FROM USER_SettingChannel Where UserName='" & Session("UserName") & "' And Url='" & MidCurrentPage & "'"
                        Try
                            _sqlreader = Proses.ExecuteReader(strSqlChannel)
                            If _sqlreader.HasRows Then
                                _sqlreader.Read()
                            Else
                                _ClassFunction.LogSuccess(Session("UserName"), strSqlChannel)
                                Dim strSql As String = "SELECT * FROM TrmMenuPreviledge Where USERID='" & Session("lvluser") & "' And (UrlUser1='" & MidCurrentPage & "' OR UrlUser2='" & MidCurrentPage & "' OR UrlUser3='" & MidCurrentPage & "')"
                                Try
                                    _sqlreader = Proses.ExecuteReader(strSql)
                                    If _sqlreader.HasRows Then
                                        _sqlreader.Read()
                                    Else
                                        _ClassFunction.LogSuccess(Session("UserName"), strSql)
                                        RemoveCookies()
                                        'Response.Redirect("auth_lockscreen.html")
                                    End If
                                    _sqlreader.Close()
                                Catch ex As Exception
                                    Response.Write(ex.Message)
                                End Try
                            End If
                            _sqlreader.Close()
                        Catch ex As Exception
                            Response.Write(ex.Message)
                        End Try
                    Else
                        Dim strSql As String = "SELECT * FROM TrmMenuPreviledge Where USERID='" & Session("lvluser") & "' And (UrlUser1='" & MidCurrentPage & "' OR UrlUser2='" & MidCurrentPage & "' OR UrlUser3='" & MidCurrentPage & "')"
                        Try
                            _sqlreader = Proses.ExecuteReader(strSql)
                            If _sqlreader.HasRows Then
                                _sqlreader.Read()
                            Else
                                _ClassFunction.LogSuccess(Session("UserName"), strSql)
                                RemoveCookies()
                                'Response.Redirect("auth_lockscreen.html")
                            End If
                            _sqlreader.Close()
                        Catch ex As Exception
                            Response.Write(ex.Message)
                        End Try
                    End If
                Else
                    If Session("lvluser") = "Layer 1" Then
                        Dim strSqlChannel As String = "SELECT * FROM USER_SettingChannel Where UserName='" & Session("UserName") & "' And Url='" & MidCurrentPage & "'"
                        Try
                            _sqlreader = Proses.ExecuteReader(strSqlChannel)
                            If _sqlreader.HasRows Then
                                _sqlreader.Read()
                                _ClassFunction.LogSuccess(Session("UserName"), strSqlChannel)
                            Else
                                _ClassFunction.LogSuccess(Session("UserName"), strSqlChannel)
                                Dim strSql As String = "SELECT * FROM TrmMenuPreviledge Where USERID='" & Session("lvluser") & "' And (UrlUser1='" & MidCurrentPage & "' OR UrlUser2='" & MidCurrentPage & "' OR UrlUser3='" & MidCurrentPage & "')"
                                Try
                                    _sqlreader = Proses.ExecuteReader(strSql)
                                    If _sqlreader.HasRows Then
                                        _sqlreader.Read()
                                    Else
                                        _ClassFunction.LogSuccess(Session("UserName"), strSql)
                                        RemoveCookies()
                                        'Response.Redirect("auth_lockscreen.html")
                                    End If
                                    _sqlreader.Close()
                                Catch ex As Exception
                                    Response.Write(ex.Message)
                                End Try
                            End If
                            _sqlreader.Close()
                        Catch ex As Exception
                            Response.Write(ex.Message)
                        End Try
                    Else
                        Dim strSql As String = "SELECT * FROM TrmMenuPreviledge Where USERID='" & Session("lvluser") & "' And (UrlUser1='" & MidCurrentPage & "' OR UrlUser2='" & MidCurrentPage & "' OR UrlUser3='" & MidCurrentPage & "')"
                        Try
                            _sqlreader = Proses.ExecuteReader(strSql)
                            If _sqlreader.HasRows Then
                                _sqlreader.Read()
                            Else
                                _ClassFunction.LogSuccess(Session("UserName"), strSql)
                                RemoveCookies()
                                'Response.Redirect("auth_lockscreen.html")
                            End If
                            _sqlreader.Close()
                        Catch ex As Exception
                            Response.Write(ex.Message)
                        End Try
                    End If
                End If
            End If
        End If
        'If Session("UserName") = "" Then
        '    Response.Redirect("../auth_login.aspx")
        'Else
        '    _PageSession()
        '    _PageMastering()
        'End If
    End Sub
    Private Sub _PageSession()
        hd_sessionLogin.Value = Session("UserName")
        TrxLoginTypeAngka.Value = Session("LoginTypeAngka")
        TrxLayerUser.Value = Session("LoginType")
        TrxDivisi.Value = Session("organization")
        hd_OtherSystem.Value = Guid.NewGuid.ToString().Replace("-", "").Substring(0, 10)
        hd_ThreadSystem.Value = Guid.NewGuid.ToString().Replace("-", "").Substring(0, 10)
        hd_AccountChannelUser.Value = "AccountChannel"
        hd_AccountContactUser.Value = "ContactChannel"
        hd_EscalationIdentity.Value = Session("EscalationIdentity")
        hd_EscalationTo.Value = Session("EscalationTo")
        hd_NameKaryawan.Value = Session("NameKaryawan")
        UserName_TextName.InnerHtml = Session("NameKaryawan")
        UserName_EmailAdress.InnerHtml = Session("EmailAddress")
        SM_AccountID.Value = Session("accountid")
        SM_AccountName.Value = Session("accountname")
        SM_AccountToken.Value = Session("token")
        SM_AccountURL.Value = Session("accounturl")
        SM_Webhook.Value = Session("webhookurl")
        hd_SIP.Value = Session("SIPuser")
        SM_MultiChatToken.Value = Session("MultiChatToken")
        SM_UrlDatakelola.Value = Session("UrlDatakelola")
        SM_CompanyToken.Value = Session("CompanyToken")

        If Session("Foto") = "" Then
            ImageFoto.Src = "../images/avatar/7.jpg"
        Else
            ImageFoto.Src = "../FileFoto/" & Session("Foto")
        End If
        hd_Extension.Value = Session("Ext")
    End Sub
    Private Sub _PageMastering()
        _strsql = "select user1.Number, user4.MenuID, MenuName, user1.Url, user1.Icon, user1.DivID, user1.Activity from user4 left outer join User1 " &
            "on user4.MenuID=user1.MenuID " &
            "where user4.leveluserid='" & Session("LevelUserID") & "' And user4.Access='1'" &
            "group by MenuName, user4.MenuID, Number, user1.url, user1.Icon, user1.DivID, user1.Activity " &
            "order by user1.number asc"
        _sqlcomm = New SqlCommand(_strsql, _sqlconn)
        _sqlconn.Open()
        _read = _sqlcomm.ExecuteReader()
        _write &= "<li class='header'>Apps & UI</li>"
        While _read.Read
            Dim _IclassRead As String = ""
            If _read("Activity") = "N" Then
                _IclassRead = "class='treeview'"
            Else
                _IclassRead = ""
            End If
            Dim Parameter As String = String.Empty
            If _read("DivID") = "1" Then
                If Session("lvluser") = "Layer 1" Then
                    If _read("MenuName") = "Log Out" Then
                        Parameter = "&mid=" & _read("MenuID").ToString & "&user=" & Session("UserName") & "&token_agent=" & Session("MultiChatToken") & "&value=logout&token_company=" & Session("CompanyToken") & ""
                    Else
                        Parameter = "&mid=" & _read("MenuID").ToString & ""
                    End If
                Else
                    Parameter = "&mid=" & _read("MenuID").ToString & ""
                End If
            Else
                Parameter = "?mid=" & _read("MenuID").ToString & ""
            End If
            _write &= "<li " & _IclassRead & "> " &
                            "<a href=" & _read("Url") & "" & Parameter & ">" &
                                "<img src='../images/svg-icon/sidebar-menu/" & _read("icon").ToString & ".svg' class='svg-icon'>" &
                                "<span>" & _read("MenuName").ToString & "</span>" &
                                "<span class='pull-right-container'>" &
                                    "<i class='fa fa-angle-right pull-right'></i>" &
                                "</span>" &
                            "</a>"
            If Session("lvluser") = "Layer 1" Then
                If _read("MenuID").ToString = "3026" Then
                    _strselect = "SELECT *, DetailMenuName as MenuTreeName FROM USER_SettingChannel where UserName='" & Session("UserName") & "' And DetailMenuName IS NULL"
                Else
                    _strselect = "SELECT distinct user4.MenuID, user4.SubMenuID, user2.SubMenuName, User2.Url, user2.Param, user2.Activity, " &
                        "User2.DivID FROM USER4 INNER JOIN User2 ON USER4.SubMenuID = USER2.SubMenuID " &
                        "INNER JOIN User1 ON USER4.MenuID = USER1.MenuID " &
                        "WHERE USER4.leveluserid='" & Session("LevelUserID") & "' AND USER4.MenuID='" & _read("MenuID") & "' And user4.Access='1' order by menuid asc"
                End If
            Else
                _strselect = "SELECT distinct user4.MenuID, user4.SubMenuID, user2.SubMenuName, User2.Url, user2.Param, user2.Activity, " &
                        "User2.DivID FROM USER4 INNER JOIN User2 ON USER4.SubMenuID = USER2.SubMenuID " &
                        "INNER JOIN User1 ON USER4.MenuID = USER1.MenuID " &
                        "WHERE USER4.leveluserid='" & Session("LevelUserID") & "' AND USER4.MenuID='" & _read("MenuID") & "' And user4.Access='1' order by menuid asc"
            End If
            _sqlcommands = New SqlCommand(_strselect, _sqlconnect)
            _sqlconnect.Open()
            _reader = _sqlcommands.ExecuteReader()
            _write &= "<ul class='treeview-menu'>"
            While _reader.Read
                Dim _Iclass As String = ""
                If _reader("Param") = "Y" Then
                    _Iclass = "class='treeview'"
                Else
                    _Iclass = ""
                End If
                Dim Parameter2 As String = String.Empty
                If _read("MenuID").ToString <> "3026" Then
                    If _reader("DivID").ToString = "0" Then
                        Parameter2 = "?mid=" & _reader("MenuID").ToString & ""
                    Else
                        Parameter2 = "&mid=" & _reader("MenuID").ToString & ""
                    End If
                Else
                    Parameter2 = "&mid=" & _reader("MenuID").ToString & ""
                End If
                'If _read("MenuName").ToString = "Report" Then
                '    _write &= "<li " & _Iclass & "><a href=" & _reader("Url") & "&p12m1=" & Encrypt(Session("username")) & "&p12m2=" & Encrypt(Session("LoginType")) & " target='_blank'><i class='ti-more'></i>" & _reader("SubMenuName") & "</a>"
                'ElseIf _read("MenuName").ToString = "File Manager" Then
                '    _write &= "<li " & _Iclass & "><a href=" & _reader("Url") & "&p12m1=" & Encrypt(Session("username")) & "&p12m2=" & Encrypt(Session("LoginType")) & " target='_blank'><i class='ti-more'></i>" & _reader("SubMenuName") & "</a>"
                'Else
                '    _write &= "<li " & _Iclass & "><a href='" & _reader("Url") & "" & Parameter2 & "'><i class='ti-more'></i>" & _reader("SubMenuName") & "</a>"
                'End If
                _write &= "<li " & _Iclass & "><a href='" & _reader("Url") & "" & Parameter2 & "'><i class='ti-more'></i>" & _reader("SubMenuName") & "</a>"
                If Session("lvluser") = "Layer 1" Then
                    _strsqlselect = "SELECT distinct USER_SettingChannel.UserName, USER_SettingChannel.MenuID, user1.MenuName, user2.SubMenuID, user2.SubMenuName, user3.SubMenuIDTree," &
                                    "user3.MenuTreeName, User3.Url FROM USER_SettingChannel " &
                                    "left outer join " &
                                    "user3 on.user3.SubMenuID=USER_SettingChannel.SubMenuID left outer join user2 on.USER_SettingChannel.SubMenuID = user2.SubMenuID " &
                                    "left outer join User1 on USER_SettingChannel.MenuID = user1.MenuID " &
                                    "where user3.SubMenuID='" & _reader("SubMenuID") & "' and USER_SettingChannel.UserName='" & Session("UserName") & "' "
                    '_strsqlselect = "SELECT *, DetailMenuName as MenuTreeName FROM USER_SettingChannel where UserName='" & Session("UserName") & "' And SubMenuID='" & _reader("SubMenuID") & "' And DetailMenuName IS NOT NULL"
                Else
                    _strsqlselect = "select distinct user4.UserID, user4.MenuID, user1.MenuName, user2.SubMenuID, user2.SubMenuName, user3.SubMenuIDTree, " &
                                "user3.MenuTreeName, User3.Url, User3.DivID " &
                                "from user4 left outer join " &
                                "user3 on.user3.SubMenuID=user4.SubMenuID left outer join user2 on.user4.SubMenuID = user2.SubMenuID " &
                                "left outer join User1 on user4.MenuID = user1.MenuID " &
                                "where user3.SubMenuID='" & _reader("SubMenuID").ToString & "' and user4.leveluserid='" & Session("LevelUserID") & "' And user4.Access='1'"
                End If

                _sqlcommander = New SqlCommand(_strsqlselect, _sqlconnections)
                _sqlconnections.Open()
                _reading = _sqlcommander.ExecuteReader()
                _write &= "<ul class='treeview-menu'>"
                While _reading.Read
                    _write &= "<li>" &
                                "<a href='" & _reading("Url").ToString & "?mid=" & _reading("MenuID").ToString & "'><i class='ti-more'></i>" & _reading("MenuTreeName").ToString & "</a>" &
                              "</li>"
                End While
                _reading.Close()
                _sqlconnections.Close()
                _write &= "</ul>"

            End While
            _reader.Close()
            _sqlconnect.Close()
            _write &= "</li></ul>"
        End While
        _read.Close()
        _sqlconn.Close()
        _write &= "</li>"
        aspxLiteral.Text = _write
    End Sub
    'Protected Sub RedirectSignout_ServerClick(sender As Object, e As EventArgs)
    '    Dim TrxCookiesUserName As HttpCookie = Request.Cookies("CookiesUserName")
    '    TrxCookiesUserName.Expires = DateTime.Now.AddDays(-1)
    '    Response.Cookies.Add(TrxCookiesUserName)
    '    _ClassAux.InsertLogoutActivity("9", Session("UserName"), "Insert")
    '    Response.Redirect("~/auth_login.aspx")
    'End Sub
    'Public Function Encrypt(clearText As String) As String
    '    Dim EncryptionKey As String = "abcdeuideskindonesia"
    '    Dim clearBytes As Byte() = Encoding.Unicode.GetBytes(clearText)
    '    Using encryptor As Aes = Aes.Create()
    '        Dim pdb As New Rfc2898DeriveBytes(EncryptionKey, New Byte() {&H49, &H76, &H61, &H6E, &H20, &H4D,
    '         &H65, &H64, &H76, &H65, &H64, &H65,
    '         &H76})
    '        encryptor.Key = pdb.GetBytes(32)
    '        encryptor.IV = pdb.GetBytes(16)
    '        Using ms As New MemoryStream()
    '            Using cs As New CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write)
    '                cs.Write(clearBytes, 0, clearBytes.Length)
    '                cs.Close()
    '            End Using
    '            clearText = Convert.ToBase64String(ms.ToArray())
    '        End Using
    '    End Using
    '    Return clearText
    'End Function
    Public Function Encrypt(clearText As String) As String
        Dim EncryptionKey As String = "abcdeuideskindonesia"
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
                clearText = Convert.ToBase64String(ms.ToArray()).TrimEnd("="c).Replace("+"c, "-"c).Replace("/"c, "_"c)
            End Using
        End Using
        Return clearText
    End Function
    Private Sub RemoveCookies()
        Dim nameCookie As HttpCookie = Request.Cookies("CookiesUserName")
        nameCookie.Expires = DateTime.Now.AddDays(-1)
        Response.Cookies.Add(nameCookie)
        Session.RemoveAll()
    End Sub
    Protected Sub ProfilLogout_ServerClick(sender As Object, e As EventArgs)
        Dim TrxCookiesUserName As HttpCookie = Request.Cookies("CookiesUserName")
        TrxCookiesUserName.Expires = DateTime.Now.AddDays(-1)
        Response.Cookies.Add(TrxCookiesUserName)
        _ClassAux.InsertLogoutActivity("9", Session("UserName"), "Insert")
        Response.Redirect("~/auth_login.aspx")
    End Sub
End Class