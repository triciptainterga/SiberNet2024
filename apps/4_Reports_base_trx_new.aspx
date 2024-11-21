<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="4_Reports_base_trx_new.aspx.vb" Inherits="ICC._4_Reports_base_trx_new" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="row" runat="server">
            <div class="col-xl-12 col-lg-12 col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Report base on Transaction</h4>
                    </div>
                    <div class="box-body p-15">
                        <div class="row" style="margin-bottom: -15px;">
                            <div class="col-sm-2">
                                <label>Start Date</label>
                                <dx:ASPxDateEdit ID="dt_strdate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd">
                                    <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                        <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                    </ValidationSettings>
                                </dx:ASPxDateEdit>
                            </div>
                            <div class="col-sm-2">
                                <label>End Date</label>
                                <dx:ASPxDateEdit ID="dt_endate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd">
                                    <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                        <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                    </ValidationSettings>
                                </dx:ASPxDateEdit>
                            </div>
                            <div class="col-sm-2" style="margin-top: 5px;">
                                <br />
                                <dx:ASPxButton ID="btn_Submit" runat="server" Theme="Metropolis" AutoPostBack="False" Text="Submit" ValidationGroup="SMLvalidationGroup"
                                    HoverStyle-BackColor="#EE4D2D" Height="30px" Width="100%">
                                </dx:ASPxButton>
                            </div>
                        </div>
                        <hr />
                        <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" runat="server" Font-Size="Small"
                            DataSourceID="TempBaseTrx" Width="100%" Styles-Header-Font-Bold="true" Theme="MetropolisBlue" 
                            Styles-Cell-HorizontalAlign="Center" Styles-Header-HorizontalAlign="Center">
                            <SettingsPager>
                                <AllButton Text="All">
                                </AllButton>
                                <NextPageButton Text="Next &gt;">
                                </NextPageButton>
                                <PrevPageButton Text="&lt; Prev">
                                </PrevPageButton>
                                <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                            </SettingsPager>
                            <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowFilterBar="Hidden" EnableFilterControlPopupMenuScrolling="true"
                                ShowVerticalScrollBar="false" ShowFooter="false" ShowHorizontalScrollBar="true" />
                            <Columns>
                                <dx:GridViewDataTextColumn Caption="No" FieldName="NoUrut" Width="40px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Interaction ID" FieldName="GenesysID" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Thread ID" FieldName="ThreadID" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Ticket Number" FieldName="TicketNumber" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Account" FieldName="AccountInbound" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Customer ID" FieldName="NIK" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Name" FieldName="CustomerName" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Email Address" FieldName="Email" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Phone Number" FieldName="HP" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Vehicle Number" FieldName="NomorRekening" HeaderStyle-HorizontalAlign="left" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Channel" FieldName="TicketSourceName" Width="150px"></dx:GridViewDataTextColumn>
                                <%--<dx:GridViewDataTextColumn Caption="Account ID" FieldName="AccountID" Width="200px"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="Type" FieldName="CategoryName" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Category " FieldName="Level1" Width="200px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Topic" FieldName="Level2" Width="300px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Subtopic" FieldName="Level3" Width="300px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Customer Question" FieldName="DescriptionNonHtml" PropertiesTextEdit-EncodeHtml="false" Width="650px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Escalation Team" FieldName="EscalationName" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Ticket Tag" FieldName="ProductName" HeaderStyle-HorizontalAlign="left" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Priority" FieldName="SkalaPrioritas" HeaderStyle-HorizontalAlign="left" Width="150px"></dx:GridViewDataTextColumn>
                                <%--<dx:GridViewDataTextColumn Caption="User Status" FieldName="JenisNasabah" HeaderStyle-HorizontalAlign="left" Width="150px"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="SLA (Hours)" FieldName="SLA" HeaderStyle-HorizontalAlign="left" CellStyle-HorizontalAlign="Left" Width="150px"></dx:GridViewDataTextColumn>
                                <%--<dx:GridViewDataTextColumn Caption="VIP User" FieldName="CusStatus" Width="150px"></dx:GridViewDataTextColumn>--%>
                                <%--<dx:GridViewDataTextColumn Caption="Address" FieldName="AlamatNonHtml" Width="150px"></dx:GridViewDataTextColumn>--%>
                                <dx:GridViewDataTextColumn Caption="Escalation" FieldName="Escalation" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Group Name" FieldName="AgentGroupName" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Site Name" FieldName="SiteName" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Ticket Status" FieldName="NewStatus" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Created By" FieldName="CreatedByNew" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataDateColumn Caption="Created Date" FieldName="CreatedDateConvert" Width="150px">
                                    <PropertiesDateEdit DisplayFormatString="yyyy-MM-dd HH:mm:ss" EditFormat="DateTime" EditFormatString="yyyy-MM-dd HH:mm:ss">
                                        <TimeSectionProperties Visible="true">
                                            <TimeEditProperties DisplayFormatString="HH:mm:ss" EditFormatString="HH:mm:ss">
                                            </TimeEditProperties>
                                        </TimeSectionProperties>
                                    </PropertiesDateEdit>
                                </dx:GridViewDataDateColumn>
                                <dx:GridViewDataTextColumn Caption="Solved By" FieldName="UserSolved" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataDateColumn Caption="Solved Date" FieldName="DateSolved" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                <dx:GridViewDataTextColumn Caption="Closed By" FieldName="ClosedByNew" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataDateColumn Caption="Closed Date" FieldName="NewDateClosed" Width="150px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                                <dx:GridViewDataTextColumn Caption="Age Ticket" FieldName="AgeTicket" Width="150px"></dx:GridViewDataTextColumn>
                            </Columns>
                        </dx:ASPxGridView>

                        <hr />
                        <div class="row">
                            <div class="col-sm-2">
                                <asp:DropDownList runat="server" ID="ddList" Height="30" CssClass="form-control input-sm">
                                    <asp:ListItem Value="xlsx" Text="Excel" />
                                    <asp:ListItem Value="xls" Text="Excel 97-2003" />
                                    <%--<asp:ListItem Value="pdf" Text="PDF" />
                                    <asp:ListItem Value="rtf" Text="RTF" />--%>
                                    <asp:ListItem Value="csv" Text="CSV" />
                                </asp:DropDownList>
                            </div>
                            <div class="col-sm-2">
                                <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis"
                                    HoverStyle-BackColor="#EE4D2D" Height="30px" Width="100%">
                                </dx:ASPxButton>
                            </div>
                        </div>
                    </div>
                    <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
                    <div class="box-footer with-border">
                    </div>
                </div>
            </div>
        </div>
        <asp:SqlDataSource ID="TempBaseTrx" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
    </section>
</asp:Content>


