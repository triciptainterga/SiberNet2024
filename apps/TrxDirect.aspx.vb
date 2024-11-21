Imports System
Imports System.Web.UI
Imports System.Data.SqlClient
Imports System.Web.Script.Serialization
Imports Microsoft.VisualBasic
Public Class TrxDirect
    Inherits System.Web.UI.Page

    Dim _ClassFunction As New WebServiceTransaction
    Dim strLogTime As String = DateTime.Now.ToString("yyyy")

    Dim Proses As New ClsConn
    Dim _reading As SqlDataReader
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Dim TrxCookiesUserName As String = String.Empty
        'Dim CookiesUsername As HttpCookie = HttpContext.Current.Request.Cookies("CookiesUserName")
        'TrxCookiesUserName = If(CookiesUsername IsNot Nothing, CookiesUsername.Value.Split("="c)(1), "undefined")
        'Dim strTime As String = DateTime.Now.ToString("yyyyMMddhhmmss")
        'Dim TrxThreadID As String = New Random().Next(100000, 999999)
        'CallerID.Value = TrxThreadID
        ''Dim TrxParamUser As String = Request.QueryString("user")
        ''Dim TrxParamPhone As String = Request.QueryString("phone")
        ''If TrxParamUser <> "" Then
        ''    Dim TrxChannel As String = "Call"
        ''    'Dim TrxNumberID As String = "CALL-" + strTime & New Random().Next(1000000, 9999999)
        ''    Dim TrxThreadID As String = strTime & New Random().Next(10000, 99999)
        ''    Dim TrxAccount As String = TrxParamPhone
        ''    Dim TrxAccountNumber As String = TrxParamPhone
        ''    Dim TrxUsername As String = Session("UserName")
        ''    Dim TrxSubject As String = "-"
        ''    Dim TrxDescription As String = "-"
        ''    Dim TrxPhoneChat As String = TrxParamPhone
        ''    Dim TrxNumberGUID As String = "CALL-" + Guid.NewGuid().ToString("N")
        ''    _ClassFunction.InsertTransactionThread(TrxChannel, TrxThreadID, TrxNumberGUID, GetValueCustomerID(TrxAccountNumber), TrxUsername, TrxAccount, TrxSubject, TrxDescription)
        ''    'If _ClassFunction.InsertTransactionThread(TrxChannel, TrxThreadID, TrxNumberGUID, GetValueCustomerID(TrxAccountNumber), TrxUsername, TrxAccount, TrxSubject, TrxDescription) = True Then
        ''    '    Response.Redirect("1_doticket.aspx?id=" + GetValueCustomerID(TrxAccountNumber) + "&channel=" + TrxChannel + "&n=1&threadid=" + TrxThreadID + "&numberid=" + TrxNumberGUID + "&account=" + TrxAccount + "")
        ''    '    _ClassFunction.LogSuccess(strLogTime, "Data has been success  " & TrxParamPhone)
        ''    'Else
        ''    '    _ClassFunction.LogSuccess(strLogTime, "Data has been failed  " & TrxParamPhone)
        ''    'End If
        ''Else
        ''    _ClassFunction.LogSuccess(strLogTime, "Data User Login Empty ")
        ''End If
    End Sub
    Function GetValueCustomerID(ByVal _Value As String)
        Dim strSql As String = ""
        strSql = "select CustomerID from SML_mCustomerChannel WHERE ValueChannel='" & _Value & "'"
                _reading = Proses.ExecuteReader(strSql)
        Try
            If _reading.HasRows() Then
                _reading.Read()
                Return _reading("CustomerID").ToString
            Else
                Return "-"
            End If
            _reading.Close()
        Catch ex As Exception
            Response.Write(ex.Message)
        End Try
    End Function
End Class