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
Public Class Dashboard_L11
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
    Public Class dataTop3
        Public Property Data As String
        Public Property UserID As String
        Public Property JumlahTicket As String
        Public Property SourceAsal As String
    End Class
    Public Class chartComplaint
        Public Property dateNya As Date
        Public Property alphaNya As String
    End Class
    Public Class dataAgent
        Public Property Data As String
        Public Property UserID As String
        Public Property Username As String
        Public Property NameAgent As String
        Public Property UnitKerja As String
        Public Property Password As String
        Public Property Leveluser As String
        Public Property GroupCampaign As String
    End Class
    Public Class listTotal
        Public Property CategoryID As String
        Public Property Keterangan As String
        Public Property Nilai As String
    End Class
    Public Class chartLEgend
        Public Property data As String
    End Class
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataListSummary(ByVal AgentName As String, ByVal StartDate As String, ByVal EndDate As String) As String
        Dim listTickets As List(Of listTotal) = New List(Of listTotal)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec Dashboard_L1_Summary '" & AgentName & "','" & StartDate & "','" & EndDate & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTotal = New listTotal()
                    objectTickets.Keterangan = rdr("Keterangan").ToString()
                    objectTickets.Nilai = rdr("Nilai").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            'LogError(strLogTime, ex, strQuery)
            Dim objectTickets As listTotal = New listTotal()
            objectTickets.Keterangan = "False"
            objectTickets.Nilai = ex.Message()
            listTickets.Add(objectTickets)
        Finally
            'LogSuccess(strLogTime, strQuery)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataListSummaryCategory(ByVal AgentName As String, ByVal StartDate As String, ByVal EndDate As String) As String
        Dim listTickets As List(Of listTotal) = New List(Of listTotal)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec [Dashboard_L1_Category] '" & AgentName & "','" & StartDate & "','" & EndDate & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As listTotal = New listTotal()
                    objectTickets.CategoryID = rdr("CategoryID").ToString()
                    objectTickets.Keterangan = rdr("Keterangan").ToString()
                    objectTickets.Nilai = rdr("Nilai").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            'LogError(strLogTime, ex, strQuery)
            Dim objectTickets As listTotal = New listTotal()
            objectTickets.Keterangan = "False"
            objectTickets.Nilai = ex.Message()
            listTickets.Add(objectTickets)
        Finally
            'LogSuccess(strLogTime, strQuery)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function


    'dataAgentName
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataAgent(ByVal LevelUser As String, ByVal Username As String, ByVal Unituser As String, ByVal Org As String) As String
        Dim listTickets As List(Of dataAgent) = New List(Of dataAgent)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec [Dashboard_GetDataAgent] '" & LevelUser & "','" & Username & "','" & Unituser & "','" & Org & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As dataAgent = New dataAgent()
                    objectTickets.Data = "True"
                    objectTickets.UserID = rdr("USERID").ToString()
                    objectTickets.Username = rdr("USERNAME").ToString()
                    objectTickets.NameAgent = rdr("NameAgent").ToString()
                    objectTickets.UnitKerja = rdr("UNITKERJA").ToString()
                    objectTickets.Password = rdr("PASSWORD").ToString()
                    objectTickets.Leveluser = rdr("LEVELUSER").ToString()
                    objectTickets.GroupCampaign = rdr("GROUP_CAMPAIGN").ToString()
                    'objectTickets.Nilai = rdr("Nilai").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            'LogError(strLogTime, ex, strQuery)
            Dim objectTickets As dataAgent = New dataAgent()
            objectTickets.Data = "False"
            listTickets.Add(objectTickets)
        Finally
            'LogSuccess(strLogTime, strQuery)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    'End
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataLegendChart(ByVal AgentName As String, ByVal StartDate As String, ByVal EndDate As String) As String
        Dim listTickets As List(Of chartLEgend) = New List(Of chartLEgend)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec [Dashboard_L1_Channel] '" & AgentName & "','" & StartDate & "','" & EndDate & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As chartLEgend = New chartLEgend()
                    objectTickets.data = rdr("Keterangan").ToString()
                    'objectTickets.Nilai = rdr("Nilai").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            'LogError(strLogTime, ex, strQuery)
            Dim objectTickets As chartLEgend = New chartLEgend()
            objectTickets.data = "False"
            listTickets.Add(objectTickets)
        Finally
            'LogSuccess(strLogTime, strQuery)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    'End
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataTop3Agent(ByVal ChannelNya As String, ByVal StartDate As String, ByVal EndDate As String) As String
        Dim listTickets As List(Of dataTop3) = New List(Of dataTop3)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec [Dashboard_L1_Top3] '" & ChannelNya & "','" & StartDate & "','" & EndDate & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                cmd.CommandTimeout = 120
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As dataTop3 = New dataTop3()
                    objectTickets.UserID = rdr("UserAgent").ToString()
                    objectTickets.JumlahTicket = rdr("CreateTicket").ToString()
                    objectTickets.SourceAsal = rdr("SourceNya").ToString()
                    'objectTickets.Nilai = rdr("Nilai").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            'LogError(strLogTime, ex, strQuery)
            Dim objectTickets As dataTop3 = New dataTop3()
            objectTickets.data = "False"
            listTickets.Add(objectTickets)
        Finally
            'LogSuccess(strLogTime, strQuery)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    'End
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataTopProductivity(ByVal ChannelNya As String, ByVal StartDate As String, ByVal EndDate As String) As String
        Dim listTickets As List(Of dataTop3) = New List(Of dataTop3)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec [Dashboard_L1_Agent_Productivity] '" & ChannelNya & "','" & StartDate & "','" & EndDate & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                cmd.CommandTimeout = 120
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As dataTop3 = New dataTop3()
                    objectTickets.UserID = rdr("UserAgent").ToString()
                    objectTickets.JumlahTicket = rdr("CreateTicket").ToString()
                    objectTickets.SourceAsal = rdr("SourceNya").ToString()
                    'objectTickets.Nilai = rdr("Nilai").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            'LogError(strLogTime, ex, strQuery)
            Dim objectTickets As dataTop3 = New dataTop3()
            objectTickets.Data = "False"
            listTickets.Add(objectTickets)
        Finally
            'LogSuccess(strLogTime, strQuery)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    'End
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataTopProductivityTopic(ByVal ChannelNya As String, ByVal StartDate As String, ByVal EndDate As String) As String
        Dim listTickets As List(Of dataTop3) = New List(Of dataTop3)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec [Dashboard_L1_Agent_Productivity_TOPIC] '" & ChannelNya & "','" & StartDate & "','" & EndDate & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                cmd.CommandTimeout = 120
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As dataTop3 = New dataTop3()
                    objectTickets.UserID = rdr("UserAgent").ToString()
                    objectTickets.JumlahTicket = rdr("CreateTicket").ToString()
                    objectTickets.SourceAsal = rdr("SourceNya").ToString()
                    'objectTickets.Nilai = rdr("Nilai").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            'LogError(strLogTime, ex, strQuery)
            Dim objectTickets As dataTop3 = New dataTop3()
            objectTickets.Data = "False"
            listTickets.Add(objectTickets)
        Finally
            'LogSuccess(strLogTime, strQuery)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
    'End
    <WebMethod()>
    <ScriptMethod(UseHttpGet:=False, ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDataTopProductivityEscalation(ByVal ChannelNya As String, ByVal StartDate As String, ByVal EndDate As String) As String
        Dim listTickets As List(Of dataTop3) = New List(Of dataTop3)()
        Dim cs As String = ConfigurationManager.ConnectionStrings("DefaultConnection").ConnectionString
        Dim strQuery As String = String.Empty
        Try
            strQuery = "exec [Dashboard_L1_Agent_Productivity_TOPIC_ESKALASI] '" & ChannelNya & "','" & StartDate & "','" & EndDate & "'"
            Using con As SqlConnection = New SqlConnection(cs)
                Dim cmd As SqlCommand
                cmd = New SqlCommand(strQuery, con)
                cmd.CommandType = CommandType.Text
                con.Open()
                Dim rdr As SqlDataReader = cmd.ExecuteReader()

                While rdr.Read()
                    Dim objectTickets As dataTop3 = New dataTop3()
                    objectTickets.UserID = rdr("UserAgent").ToString()
                    objectTickets.JumlahTicket = rdr("CreateTicket").ToString()
                    objectTickets.SourceAsal = rdr("SourceNya").ToString()
                    'objectTickets.Nilai = rdr("Nilai").ToString()
                    listTickets.Add(objectTickets)
                End While

            End Using
        Catch ex As Exception
            'LogError(strLogTime, ex, strQuery)
            Dim objectTickets As dataTop3 = New dataTop3()
            objectTickets.Data = "False"
            listTickets.Add(objectTickets)
        Finally
            'LogSuccess(strLogTime, strQuery)
        End Try
        Dim js As JavaScriptSerializer = New JavaScriptSerializer()
        Return js.Serialize(listTickets)
    End Function
End Class