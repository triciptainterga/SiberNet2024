<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrxProfileModals.aspx.vb" Inherits="ICC.TrxProfileModals" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <button type="button" class="btn btn-rounded btn-info" data-toggle="modal" data-target="#modal-fill">
        Launch demo modal
    </button>
    <button type="button" class="btn btn-rounded btn-info" data-toggle="modal" data-target="#modal-right">
        Launch demo modal center
    </button>
    <!-- Modal -->
    <div class="modal modal-fill fade" data-backdrop="false" id="modal-fill" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /.modal -->
    <!-- Modal -->
    <div class="modal center-modal fade" id="modal-center">
        <div class="modal-dialog" tabindex="-1">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 col-xl-3">
                            <div class="box bg-gradient-primary">
                                <div class="box-header">
                                    <h4 class="box-title text-white"></h4>
                                    <ul class="box-controls pull-right">
                                        <li class="dropdown">
                                            <a data-toggle="dropdown" href="#" class="btn btn-rounded btn-outline btn-white px-10">Action</a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a class="dropdown-item" href="#"><i class="fa fa-pencil"></i>Edit Profile</a>
                                                <a class="dropdown-item" href="#"><i class='fa fa-plus'></i>Add Channel</a>
                                                <div class="dropdown-divider"></div>
                                                <a class="dropdown-item" href="#"><i class="ti-settings"></i>Settings</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="box-body">
                                    <div class="slimScrollDiv">
                                        <div class="box-body text-center pb-50">
                                            <a href="#">
                                                <img class="avatar avatar-xxl avatar-bordered" src="../images/avatar/5.jpg" alt="">
                                            </a>
                                            <h4 class="mt-2 mb-0"><a class="hover-primary text-white" href="#">Roben Parkar</a></h4>
                                        </div>
                                        <div class="px-10 py-30 bg-white text-dark">
                                            <h5 class="px-10 mb-15 font-weight-700">Personal Info</h5>
                                            <div class="box-body form-element">
                                                <input class="form-control input-lg" type="text" placeholder=".input-lg" value="Male">
                                                <br>
                                                <br>
                                                <input class="form-control" type="text" placeholder="Default input" value="12 Januari 1980">
                                                <br>
                                                <br>
                                                <input class="form-control input-sm" type="text" placeholder=".input-sm" value="Moeslim">
                                            </div>
                                        </div>
                                        <div class="px-10 py-30 my-20 bg-white text-dark">
                                            <h5 class="px-10 mb-15 font-weight-700">Detail Info</h5>
                                            <div class="box-body form-element">
                                                <input class="form-control input-lg" type="text" placeholder=".input-lg" value="rizalsamsurizal@gmail.com">
                                                <br>
                                                <br>
                                                <input class="form-control" type="text" placeholder="Default input" value="082847632743438">
                                                <br>
                                                <br>
                                                <input class="form-control input-sm" type="text" placeholder=".input-sm" value="rizalsamsurizal">
                                                <br>
                                                <br>
                                                <input class="form-control input-sm" type="text" placeholder=".input-sm" value="rizalsamsurizal">
                                                <br>
                                                <br>
                                                <input class="form-control input-sm" type="text" placeholder=".input-sm" value="rizalsamsurizal">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-xl-9">
                            <div class="row">
                                <div class="col-12">
                                    <div class="box">
                                        <div class="box-body">
                                            <!-- Nav tabs -->
                                            <ul class="nav nav-pills rounded nav-justified">
                                                <li class="nav-item"><a href="#navpills-1" class="nav-link active" data-toggle="tab" aria-expanded="false">Script Outbound</a> </li>
                                                <li class="nav-item"><a href="#navpills-2" class="nav-link" data-toggle="tab" aria-expanded="false">Note Outbound</a> </li>
                                                <li class="nav-item"><a href="#navpills-3" class="nav-link" data-toggle="tab" aria-expanded="true">Reminder Note</a> </li>
                                                <li class="nav-item"><a href="#navpills-4" class="nav-link" data-toggle="tab" aria-expanded="true">Helpdesk Transaction</a> </li>
                                            </ul>
                                        </div>
                                        <!-- /.box-body -->
                                    </div>
                                    <!-- /.box -->
                                    <div class="box">
                                        <div class="box-body">
                                            <!-- Tab panes -->
                                            <div class="tab-content">
                                                <div id="navpills-1" class="tab-pane active">
                                                    <!-- Categroy 1 -->
                                                    <div class=" tab-pane animation-fade active" id="category-1" role="tabpanel">
                                                        <div class="panel-group panel-group-simple panel-group-continuous" id="accordion2"
                                                            aria-multiselectable="true" role="tablist">
                                                            <!-- Question 1 -->
                                                            <div class="panel">
                                                                <div class="panel-heading" id="question-1" role="tab">
                                                                    <a class="panel-title" aria-controls="answer-1" aria-expanded="true" data-toggle="collapse"
                                                                        href="#answer-1" data-parent="#accordion2"><b>Greeting Script</b>
                                                                    </a>
                                                                </div>
                                                                <div class="panel-collapse collapse show" id="answer-1" aria-labelledby="question-1"
                                                                    role="tabpanel">
                                                                    <div class="panel-body">
                                                                        <p>
                                                                            <i>18 May 2021 17:55 WIB
                                                                    <br />
                                                                                Customer last interaction from outbound channel
                                                                <br />
                                                                                <br />
                                                                                Last agent interaction outbound note</i>
                                                                            <br />
                                                                            <br />
                                                                        </p>
                                                                        <p>
                                                                            Hi _____________, this is Jess from Fit Small Business. We haven’t met yet, but I was doing some research on companies that may be a good fit for our [product or service] and noticed we might be able to help.
                                                                <br />
                                                                            <br />
                                                                            I haven’t caught you at a bad time, have I?
                                                                <br />
                                                                            <br />
                                                                            I know your time is valuable so I’ll be brief. Several of the businesses we work with encounter challenges in finding affordable, effective tools to manage their growing teams. Is that something you experience at [company name]?
                                                                <br />
                                                                            <br />
                                                                            We’re a software company that’s dedicated to making tools that save time, improve productivity, and increase sales for small businesses. I’d love to set up 15 minutes with you and anyone else on your team who’d like to learn more next week. Does Monday or Thursday afternoon work better for you?
                                                                <br />
                                                                            <br />
                                                                            Great, I’ll send you a calendar invite right away. Thank you for your time—I look forward to meeting you soon!    
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- End Question 1 -->
                                                            <!-- Question 2 -->
                                                            <div class="panel">
                                                                <div class="panel-heading" id="question-2" role="tab">
                                                                    <a class="panel-title" aria-controls="answer-2" aria-expanded="false" data-toggle="collapse"
                                                                        href="#answer-2" data-parent="#accordion2"><b>History Transaction Outbound</b>
                                                                    </a>
                                                                </div>
                                                                <div class="panel-collapse collapse" id="answer-2" aria-labelledby="question-2" role="tabpanel">
                                                                    <div class="panel-body">
                                                                        <table id="tickets" class="table table-bordered table-striped" style="width: 100%">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Name</th>
                                                                                    <th>Position</th>
                                                                                    <th>Office</th>
                                                                                    <th>Age</th>
                                                                                    <th>Start date</th>
                                                                                    <th>Salary</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>Tiger Nixon</td>
                                                                                    <td>System Architect</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>61</td>
                                                                                    <td>2011/04/25</td>
                                                                                    <td>$320,800</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Garrett Winters</td>
                                                                                    <td>Accountant</td>
                                                                                    <td>Tokyo</td>
                                                                                    <td>63</td>
                                                                                    <td>2011/07/25</td>
                                                                                    <td>$170,750</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Ashton Cox</td>
                                                                                    <td>Junior Technical Author</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>66</td>
                                                                                    <td>2009/01/12</td>
                                                                                    <td>$86,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Cedric Kelly</td>
                                                                                    <td>Senior Javascript Developer</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>22</td>
                                                                                    <td>2012/03/29</td>
                                                                                    <td>$433,060</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Airi Satou</td>
                                                                                    <td>Accountant</td>
                                                                                    <td>Tokyo</td>
                                                                                    <td>33</td>
                                                                                    <td>2008/11/28</td>
                                                                                    <td>$162,700</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Brielle Williamson</td>
                                                                                    <td>Integration Specialist</td>
                                                                                    <td>New York</td>
                                                                                    <td>61</td>
                                                                                    <td>2012/12/02</td>
                                                                                    <td>$372,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Herrod Chandler</td>
                                                                                    <td>Sales Assistant</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>59</td>
                                                                                    <td>2012/08/06</td>
                                                                                    <td>$137,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Rhona Davidson</td>
                                                                                    <td>Integration Specialist</td>
                                                                                    <td>Tokyo</td>
                                                                                    <td>55</td>
                                                                                    <td>2010/10/14</td>
                                                                                    <td>$327,900</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Colleen Hurst</td>
                                                                                    <td>Javascript Developer</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>39</td>
                                                                                    <td>2009/09/15</td>
                                                                                    <td>$205,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Sonya Frost</td>
                                                                                    <td>Software Engineer</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>23</td>
                                                                                    <td>2008/12/13</td>
                                                                                    <td>$103,600</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Jena Gaines</td>
                                                                                    <td>Office Manager</td>
                                                                                    <td>London</td>
                                                                                    <td>30</td>
                                                                                    <td>2008/12/19</td>
                                                                                    <td>$90,560</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Quinn Flynn</td>
                                                                                    <td>Support Lead</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>22</td>
                                                                                    <td>2013/03/03</td>
                                                                                    <td>$342,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Charde Marshall</td>
                                                                                    <td>Regional Director</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>36</td>
                                                                                    <td>2008/10/16</td>
                                                                                    <td>$470,600</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Haley Kennedy</td>
                                                                                    <td>Senior Marketing Designer</td>
                                                                                    <td>London</td>
                                                                                    <td>43</td>
                                                                                    <td>2012/12/18</td>
                                                                                    <td>$313,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Tatyana Fitzpatrick</td>
                                                                                    <td>Regional Director</td>
                                                                                    <td>London</td>
                                                                                    <td>19</td>
                                                                                    <td>2010/03/17</td>
                                                                                    <td>$385,750</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Michael Silva</td>
                                                                                    <td>Marketing Designer</td>
                                                                                    <td>London</td>
                                                                                    <td>66</td>
                                                                                    <td>2012/11/27</td>
                                                                                    <td>$198,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Paul Byrd</td>
                                                                                    <td>Chief Financial Officer (CFO)</td>
                                                                                    <td>New York</td>
                                                                                    <td>64</td>
                                                                                    <td>2010/06/09</td>
                                                                                    <td>$725,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Gloria Little</td>
                                                                                    <td>Systems Administrator</td>
                                                                                    <td>New York</td>
                                                                                    <td>59</td>
                                                                                    <td>2009/04/10</td>
                                                                                    <td>$237,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Bradley Greer</td>
                                                                                    <td>Software Engineer</td>
                                                                                    <td>London</td>
                                                                                    <td>41</td>
                                                                                    <td>2012/10/13</td>
                                                                                    <td>$132,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Dai Rios</td>
                                                                                    <td>Personnel Lead</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>35</td>
                                                                                    <td>2012/09/26</td>
                                                                                    <td>$217,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Jenette Caldwell</td>
                                                                                    <td>Development Lead</td>
                                                                                    <td>New York</td>
                                                                                    <td>30</td>
                                                                                    <td>2011/09/03</td>
                                                                                    <td>$345,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Yuri Berry</td>
                                                                                    <td>Chief Marketing Officer (CMO)</td>
                                                                                    <td>New York</td>
                                                                                    <td>40</td>
                                                                                    <td>2009/06/25</td>
                                                                                    <td>$675,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Caesar Vance</td>
                                                                                    <td>Pre-Sales Support</td>
                                                                                    <td>New York</td>
                                                                                    <td>21</td>
                                                                                    <td>2011/12/12</td>
                                                                                    <td>$106,450</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Doris Wilder</td>
                                                                                    <td>Sales Assistant</td>
                                                                                    <td>Sidney</td>
                                                                                    <td>23</td>
                                                                                    <td>2010/09/20</td>
                                                                                    <td>$85,600</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Angelica Ramos</td>
                                                                                    <td>Chief Executive Officer (CEO)</td>
                                                                                    <td>London</td>
                                                                                    <td>47</td>
                                                                                    <td>2009/10/09</td>
                                                                                    <td>$1,200,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Gavin Joyce</td>
                                                                                    <td>Developer</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>42</td>
                                                                                    <td>2010/12/22</td>
                                                                                    <td>$92,575</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Jennifer Chang</td>
                                                                                    <td>Regional Director</td>
                                                                                    <td>Singapore</td>
                                                                                    <td>28</td>
                                                                                    <td>2010/11/14</td>
                                                                                    <td>$357,650</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Brenden Wagner</td>
                                                                                    <td>Software Engineer</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>28</td>
                                                                                    <td>2011/06/07</td>
                                                                                    <td>$206,850</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Fiona Green</td>
                                                                                    <td>Chief Operating Officer (COO)</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>48</td>
                                                                                    <td>2010/03/11</td>
                                                                                    <td>$850,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Shou Itou</td>
                                                                                    <td>Regional Marketing</td>
                                                                                    <td>Tokyo</td>
                                                                                    <td>20</td>
                                                                                    <td>2011/08/14</td>
                                                                                    <td>$163,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Michelle House</td>
                                                                                    <td>Integration Specialist</td>
                                                                                    <td>Sidney</td>
                                                                                    <td>37</td>
                                                                                    <td>2011/06/02</td>
                                                                                    <td>$95,400</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Suki Burks</td>
                                                                                    <td>Developer</td>
                                                                                    <td>London</td>
                                                                                    <td>53</td>
                                                                                    <td>2009/10/22</td>
                                                                                    <td>$114,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Prescott Bartlett</td>
                                                                                    <td>Technical Author</td>
                                                                                    <td>London</td>
                                                                                    <td>27</td>
                                                                                    <td>2011/05/07</td>
                                                                                    <td>$145,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Gavin Cortez</td>
                                                                                    <td>Team Leader</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>22</td>
                                                                                    <td>2008/10/26</td>
                                                                                    <td>$235,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Martena Mccray</td>
                                                                                    <td>Post-Sales support</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>46</td>
                                                                                    <td>2011/03/09</td>
                                                                                    <td>$324,050</td>
                                                                                </tr>
                                                                            </tbody>
                                                                            <tfoot>
                                                                                <tr>
                                                                                    <th>Name</th>
                                                                                    <th>Position</th>
                                                                                    <th>Office</th>
                                                                                    <th>Age</th>
                                                                                    <th>Start date</th>
                                                                                    <th>Salary</th>
                                                                                </tr>
                                                                            </tfoot>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- End Question 2 -->
                                                            <!-- Question 3 -->
                                                            <%--<div class="panel">
                                                    <div class="panel-heading" id="question-3" role="tab">
                                                        <a class="panel-title" aria-controls="answer-3" aria-expanded="false" data-toggle="collapse"
                                                            href="#answer-3" data-parent="#accordion2">Morbi quis dui at justo posuere aliquam?
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse" id="answer-3" aria-labelledby="question-3"
                                                        role="tabpanel">
                                                        <div class="panel-body">
                                                            I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
                                                        </div>
                                                    </div>
                                                </div>--%>
                                                            <!-- End Question 3 -->
                                                            <!-- Question 4 -->
                                                            <%--<div class="panel">
                                                    <div class="panel-heading" id="question-4" role="tab">
                                                        <a class="panel-title" aria-controls="answer-4" aria-expanded="false" data-toggle="collapse"
                                                            href="#answer-4" data-parent="#accordion2">Vivamus dictum turpis at nisi mattis congue?
                                                        </a>
                                                    </div>
                                                    <div class="panel-collapse collapse" id="answer-4" aria-labelledby="question-4"
                                                        role="tabpanel">
                                                        <div class="panel-body">
                                                            I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
                                                        </div>
                                                    </div>
                                                </div>--%>
                                                            <!-- End Question 4 -->
                                                        </div>
                                                    </div>
                                                    <!-- End Categroy 1 -->
                                                </div>
                                                <div id="navpills-2" class="tab-pane">
                                                    <!-- Categroy 2 -->
                                                    <div class="tab-pane animation-fade" id="category-2" role="tabpanel">
                                                        <div class="panel-group panel-group-simple panel-group-continuous" id="accordion"
                                                            aria-multiselectable="true" role="tablist">
                                                            <!-- Question 5 -->
                                                            <div class="panel">
                                                                <div class="panel-heading" id="question-5" role="tab">
                                                                    <a class="panel-title" aria-controls="answer-5" aria-expanded="true" data-toggle="collapse"
                                                                        href="#answer-5" data-parent="#accordion"><b>Add Note Outbound</b>
                                                                    </a>
                                                                </div>
                                                                <div class="panel-collapse collapse show" id="answer-5" aria-labelledby="question-5"
                                                                    role="tabpanel">
                                                                    <div class="panel-body">
                                                                        <div class="row">
                                                                            <div class="col-md-4">
                                                                                <div class="form-group">
                                                                                    <label>Priority Scale</label>
                                                                                    <select id="selectPriority" class="form-control select2">
                                                                                        <option>Select</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-4">
                                                                                <div class="form-group">
                                                                                    <label>Priority Scale</label>
                                                                                    <select id="select1" class="form-control">
                                                                                        <option>Select</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-4">
                                                                                <div class="form-group">
                                                                                    <label>Priority Scale</label>
                                                                                    <select id="select2" class="form-control">
                                                                                        <option>Select</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="form-group">
                                                                                    <label>Campaign Description</label>
                                                                                    <textarea style="height: 250px;" class="form-control" id="TrxCampaignDescription"></textarea>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <button type="button" class="btn btn-rounded btn-secondary float-left" data-dismiss="modal">Close</button>
                                                                                <button type="button" class="btn btn-rounded btn-primary float-right">Save</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- End Question 5 -->
                                                            <!-- Question 6 -->
                                                            <div class="panel">
                                                                <div class="panel-heading" id="question-6" role="tab">
                                                                    <a class="panel-title" aria-controls="answer-6" aria-expanded="false" data-toggle="collapse"
                                                                        href="#answer-6" data-parent="#accordion"><b>Interaction Note Outbound</b>
                                                                    </a>
                                                                </div>
                                                                <div class="panel-collapse collapse" id="answer-6" aria-labelledby="question-6"
                                                                    role="tabpanel">
                                                                    <div class="panel-body" style="height: 300px;">
                                                                        <div class="box-body p-0">
                                                                            <div class="events-side">
                                                                                <div class="media-list media-list-hover" style="height: 500px;">
                                                                                    <div class="media media-single">
                                                                                        <div class="media-body">
                                                                                            <h6 class="font-weight-600"><a href="#">8 March</a></h6>
                                                                                            <p class="text-fader">Main basket bersama muhammad fauzi</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="media media-single">
                                                                                        <div class="media-body">
                                                                                            <h6 class="font-weight-600"><a href="#">9 March</a></h6>
                                                                                            <p class="text-fader">Deadline project desain aplikasi $5000</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="media media-single">
                                                                                        <div class="media-body">
                                                                                            <h6 class="font-weight-600"><a href="#">10 March</a></h6>
                                                                                            <p class="text-fader">Meeting ITone persiapan lomba website di jogja dan ... </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="media media-single">
                                                                                        <div class="media-body">
                                                                                            <h6 class="font-weight-600"><a href="#">11 March</a></h6>
                                                                                            <p class="text-fader">Berangkat ke jogja untuk technical meeting </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="media media-single">
                                                                                        <div class="media-body">
                                                                                            <h6 class="font-weight-600"><a href="#">28 March</a></h6>
                                                                                            <p class="text-fader">Main basket bersama muhammad fauzi</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="media media-single">
                                                                                        <div class="media-body">
                                                                                            <h6 class="font-weight-600"><a href="#">29 March</a></h6>
                                                                                            <p class="text-fader">Main basket bersama muhammad fauzi</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- End Question 6 -->
                                                            <!-- Question 7 -->
                                                        </div>
                                                    </div>
                                                    <!-- End Categroy 2 -->
                                                </div>
                                                <div id="navpills-3" class="tab-pane">
                                                    <!-- Categroy 3 -->
                                                    <div class="tab-pane animation-fade" id="category-3" role="tabpanel">
                                                        <div class="panel-group panel-group-simple panel-group-continuous" id="accordion1"
                                                            aria-multiselectable="true" role="tablist">
                                                            <!-- Question 8 -->
                                                            <div class="panel">
                                                                <div class="panel-heading" id="question-8" role="tab">
                                                                    <a class="panel-title" aria-controls="answer-8" aria-expanded="true" data-toggle="collapse"
                                                                        href="#answer-8" data-parent="#accordion1">Proin ac velit non neque efficitur pretium a a nunc?
                                                                    </a>
                                                                </div>
                                                                <div class="panel-collapse collapse show" id="answer-8" aria-labelledby="question-8"
                                                                    role="tabpanel">
                                                                    <div class="panel-body">
                                                                        I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- End Question 8 -->
                                                            <!-- Question 9 -->
                                                            <div class="panel">
                                                                <div class="panel-heading" id="question-9" role="tab">
                                                                    <a class="panel-title" aria-controls="answer-9" aria-expanded="false" data-toggle="collapse"
                                                                        href="#answer-9" data-parent="#accordion1">Reminder Note History
                                                                    </a>
                                                                </div>
                                                                <div class="panel-collapse collapse" id="answer-9" aria-labelledby="question-9"
                                                                    role="tabpanel">
                                                                    <div class="panel-body">
                                                                        <div class="mailbox-read-info">
                                                                            <h3>Replace Insurance Card</h3>
                                                                        </div>
                                                                        <div class="mailbox-read-info bb-0 clearfix">
                                                                            <div class="float-left mr-5">
                                                                                <a href="#">
                                                                                    <img src="../images/1.jpg" alt="user" width="40" class="rounded-circle"></a>
                                                                            </div>
                                                                            <h5 class="no-margin">Agent Samsu Rizal<br>
                                                                                <small>Jacob@domain.com</small>
                                                                                <span class="mailbox-read-time pull-right">22 JUL. 2018 08:03 PM</span></h5>
                                                                        </div>
                                                                        <!-- /.mailbox-read-info -->
                                                                        <div class="mailbox-read-message">
                                                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.</p>
                                                                            <p>enean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar.</p>
                                                                        </div>
                                                                        <hr />
                                                                        <div class="mailbox-read-info">
                                                                            <h3>Family Registered</h3>
                                                                        </div>
                                                                        <div class="mailbox-read-info bb-0 clearfix">
                                                                            <div class="float-left mr-5">
                                                                                <a href="#">
                                                                                    <img src="../images/1.jpg" alt="user" width="40" class="rounded-circle"></a>
                                                                            </div>
                                                                            <h5 class="no-margin">Agent Chandra<br>
                                                                                <small>Jacob@domain.com</small>
                                                                                <span class="mailbox-read-time pull-right">10 JUN. 2018 08:03 PM</span></h5>
                                                                        </div>
                                                                        <!-- /.mailbox-read-info -->
                                                                        <div class="mailbox-read-message">
                                                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.</p>
                                                                            <p>enean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- End Question 9 -->
                                                        </div>
                                                    </div>
                                                    <!-- End Categroy 3 -->
                                                </div>
                                                <div id="navpills-4" class="tab-pane">
                                                    <!-- Categroy 4 -->
                                                    <div class="tab-pane animation-fade" id="category-4" role="tabpanel">
                                                        <div class="panel-group panel-group-simple panel-group-continuous" id="accordion3"
                                                            aria-multiselectable="true" role="tablist">
                                                            <!-- Question 11 -->
                                                            <div class="panel">
                                                                <div class="panel-heading" id="question-11" role="tab">
                                                                    <a class="panel-title" aria-controls="answer-11" aria-expanded="true" data-toggle="collapse"
                                                                        href="#answer-11" data-parent="#accordion3"><b>History Transaction</b>
                                                                    </a>
                                                                </div>
                                                                <div class="panel-collapse collapse show" id="answer-11" aria-labelledby="question-11"
                                                                    role="tabpanel">
                                                                    <div class="panel-body">
                                                                        <table id="example5" class="table table-bordered table-striped" style="width: 100%">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Name</th>
                                                                                    <th>Position</th>
                                                                                    <th>Office</th>
                                                                                    <th>Age</th>
                                                                                    <th>Start date</th>
                                                                                    <th>Salary</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>Tiger Nixon</td>
                                                                                    <td>System Architect</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>61</td>
                                                                                    <td>2011/04/25</td>
                                                                                    <td>$320,800</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Garrett Winters</td>
                                                                                    <td>Accountant</td>
                                                                                    <td>Tokyo</td>
                                                                                    <td>63</td>
                                                                                    <td>2011/07/25</td>
                                                                                    <td>$170,750</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Ashton Cox</td>
                                                                                    <td>Junior Technical Author</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>66</td>
                                                                                    <td>2009/01/12</td>
                                                                                    <td>$86,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Cedric Kelly</td>
                                                                                    <td>Senior Javascript Developer</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>22</td>
                                                                                    <td>2012/03/29</td>
                                                                                    <td>$433,060</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Airi Satou</td>
                                                                                    <td>Accountant</td>
                                                                                    <td>Tokyo</td>
                                                                                    <td>33</td>
                                                                                    <td>2008/11/28</td>
                                                                                    <td>$162,700</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Brielle Williamson</td>
                                                                                    <td>Integration Specialist</td>
                                                                                    <td>New York</td>
                                                                                    <td>61</td>
                                                                                    <td>2012/12/02</td>
                                                                                    <td>$372,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Herrod Chandler</td>
                                                                                    <td>Sales Assistant</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>59</td>
                                                                                    <td>2012/08/06</td>
                                                                                    <td>$137,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Rhona Davidson</td>
                                                                                    <td>Integration Specialist</td>
                                                                                    <td>Tokyo</td>
                                                                                    <td>55</td>
                                                                                    <td>2010/10/14</td>
                                                                                    <td>$327,900</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Colleen Hurst</td>
                                                                                    <td>Javascript Developer</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>39</td>
                                                                                    <td>2009/09/15</td>
                                                                                    <td>$205,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Sonya Frost</td>
                                                                                    <td>Software Engineer</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>23</td>
                                                                                    <td>2008/12/13</td>
                                                                                    <td>$103,600</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Jena Gaines</td>
                                                                                    <td>Office Manager</td>
                                                                                    <td>London</td>
                                                                                    <td>30</td>
                                                                                    <td>2008/12/19</td>
                                                                                    <td>$90,560</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Quinn Flynn</td>
                                                                                    <td>Support Lead</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>22</td>
                                                                                    <td>2013/03/03</td>
                                                                                    <td>$342,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Charde Marshall</td>
                                                                                    <td>Regional Director</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>36</td>
                                                                                    <td>2008/10/16</td>
                                                                                    <td>$470,600</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Haley Kennedy</td>
                                                                                    <td>Senior Marketing Designer</td>
                                                                                    <td>London</td>
                                                                                    <td>43</td>
                                                                                    <td>2012/12/18</td>
                                                                                    <td>$313,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Tatyana Fitzpatrick</td>
                                                                                    <td>Regional Director</td>
                                                                                    <td>London</td>
                                                                                    <td>19</td>
                                                                                    <td>2010/03/17</td>
                                                                                    <td>$385,750</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Michael Silva</td>
                                                                                    <td>Marketing Designer</td>
                                                                                    <td>London</td>
                                                                                    <td>66</td>
                                                                                    <td>2012/11/27</td>
                                                                                    <td>$198,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Paul Byrd</td>
                                                                                    <td>Chief Financial Officer (CFO)</td>
                                                                                    <td>New York</td>
                                                                                    <td>64</td>
                                                                                    <td>2010/06/09</td>
                                                                                    <td>$725,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Gloria Little</td>
                                                                                    <td>Systems Administrator</td>
                                                                                    <td>New York</td>
                                                                                    <td>59</td>
                                                                                    <td>2009/04/10</td>
                                                                                    <td>$237,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Bradley Greer</td>
                                                                                    <td>Software Engineer</td>
                                                                                    <td>London</td>
                                                                                    <td>41</td>
                                                                                    <td>2012/10/13</td>
                                                                                    <td>$132,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Dai Rios</td>
                                                                                    <td>Personnel Lead</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>35</td>
                                                                                    <td>2012/09/26</td>
                                                                                    <td>$217,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Jenette Caldwell</td>
                                                                                    <td>Development Lead</td>
                                                                                    <td>New York</td>
                                                                                    <td>30</td>
                                                                                    <td>2011/09/03</td>
                                                                                    <td>$345,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Yuri Berry</td>
                                                                                    <td>Chief Marketing Officer (CMO)</td>
                                                                                    <td>New York</td>
                                                                                    <td>40</td>
                                                                                    <td>2009/06/25</td>
                                                                                    <td>$675,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Caesar Vance</td>
                                                                                    <td>Pre-Sales Support</td>
                                                                                    <td>New York</td>
                                                                                    <td>21</td>
                                                                                    <td>2011/12/12</td>
                                                                                    <td>$106,450</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Doris Wilder</td>
                                                                                    <td>Sales Assistant</td>
                                                                                    <td>Sidney</td>
                                                                                    <td>23</td>
                                                                                    <td>2010/09/20</td>
                                                                                    <td>$85,600</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Angelica Ramos</td>
                                                                                    <td>Chief Executive Officer (CEO)</td>
                                                                                    <td>London</td>
                                                                                    <td>47</td>
                                                                                    <td>2009/10/09</td>
                                                                                    <td>$1,200,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Gavin Joyce</td>
                                                                                    <td>Developer</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>42</td>
                                                                                    <td>2010/12/22</td>
                                                                                    <td>$92,575</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Jennifer Chang</td>
                                                                                    <td>Regional Director</td>
                                                                                    <td>Singapore</td>
                                                                                    <td>28</td>
                                                                                    <td>2010/11/14</td>
                                                                                    <td>$357,650</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Brenden Wagner</td>
                                                                                    <td>Software Engineer</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>28</td>
                                                                                    <td>2011/06/07</td>
                                                                                    <td>$206,850</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Fiona Green</td>
                                                                                    <td>Chief Operating Officer (COO)</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>48</td>
                                                                                    <td>2010/03/11</td>
                                                                                    <td>$850,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Shou Itou</td>
                                                                                    <td>Regional Marketing</td>
                                                                                    <td>Tokyo</td>
                                                                                    <td>20</td>
                                                                                    <td>2011/08/14</td>
                                                                                    <td>$163,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Michelle House</td>
                                                                                    <td>Integration Specialist</td>
                                                                                    <td>Sidney</td>
                                                                                    <td>37</td>
                                                                                    <td>2011/06/02</td>
                                                                                    <td>$95,400</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Suki Burks</td>
                                                                                    <td>Developer</td>
                                                                                    <td>London</td>
                                                                                    <td>53</td>
                                                                                    <td>2009/10/22</td>
                                                                                    <td>$114,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Prescott Bartlett</td>
                                                                                    <td>Technical Author</td>
                                                                                    <td>London</td>
                                                                                    <td>27</td>
                                                                                    <td>2011/05/07</td>
                                                                                    <td>$145,000</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Gavin Cortez</td>
                                                                                    <td>Team Leader</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>22</td>
                                                                                    <td>2008/10/26</td>
                                                                                    <td>$235,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Martena Mccray</td>
                                                                                    <td>Post-Sales support</td>
                                                                                    <td>Edinburgh</td>
                                                                                    <td>46</td>
                                                                                    <td>2011/03/09</td>
                                                                                    <td>$324,050</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Unity Butler</td>
                                                                                    <td>Marketing Designer</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>47</td>
                                                                                    <td>2009/12/09</td>
                                                                                    <td>$85,675</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Howard Hatfield</td>
                                                                                    <td>Office Manager</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>51</td>
                                                                                    <td>2008/12/16</td>
                                                                                    <td>$164,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Hope Fuentes</td>
                                                                                    <td>Secretary</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>41</td>
                                                                                    <td>2010/02/12</td>
                                                                                    <td>$109,850</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Vivian Harrell</td>
                                                                                    <td>Financial Controller</td>
                                                                                    <td>San Francisco</td>
                                                                                    <td>62</td>
                                                                                    <td>2009/02/14</td>
                                                                                    <td>$452,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Timothy Mooney</td>
                                                                                    <td>Office Manager</td>
                                                                                    <td>London</td>
                                                                                    <td>37</td>
                                                                                    <td>2008/12/11</td>
                                                                                    <td>$136,200</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Jackson Bradshaw</td>
                                                                                    <td>Director</td>
                                                                                    <td>New York</td>
                                                                                    <td>65</td>
                                                                                    <td>2008/09/26</td>
                                                                                    <td>$645,750</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Olivia Liang</td>
                                                                                    <td>Support Engineer</td>
                                                                                    <td>Singapore</td>
                                                                                    <td>64</td>
                                                                                    <td>2011/02/03</td>
                                                                                    <td>$234,500</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Bruno Nash</td>
                                                                                    <td>Software Engineer</td>
                                                                                    <td>London</td>
                                                                                    <td>38</td>
                                                                                    <td>2011/05/03</td>
                                                                                    <td>$163,500</td>
                                                                                </tr>
                                                                            </tbody>
                                                                            <tfoot>
                                                                                <tr>
                                                                                    <th>Name</th>
                                                                                    <th>Position</th>
                                                                                    <th>Office</th>
                                                                                    <th>Age</th>
                                                                                    <th>Start date</th>
                                                                                    <th>Salary</th>
                                                                                </tr>
                                                                            </tfoot>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- End Question 11 -->
                                                            <!-- Question 12 -->
                                                            <div class="panel">
                                                                <div class="panel-heading" id="question-12" role="tab">
                                                                    <a class="panel-title" aria-controls="answer-12" aria-expanded="false" data-toggle="collapse"
                                                                        href="#answer-12" data-parent="#accordion3">Mauris sit amet justo pharetra, venenatis purus eu, efficitur nunc?
                                                                    </a>
                                                                </div>
                                                                <div class="panel-collapse collapse" id="answer-12" aria-labelledby="question-12"
                                                                    role="tabpanel">
                                                                    <div class="panel-body">
                                                                        I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- End Question 12 -->
                                                        </div>
                                                    </div>
                                                    <!-- End Categroy 4 -->
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.box-body -->
                                    </div>
                                    <!-- /.box -->
                                </div>
                            </div>
                            <!-- /.row -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.modal -->
    <!-- Modal -->
    <div class="modal modal-right fade" id="modal-right" tabindex="-1" style="width: 1100px;">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 1100px;">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="width: 1100px;">
                    <p>Your content comes here</p>
                </div>
                <div class="modal-footer modal-footer-uniform">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /.modal -->
</asp:Content>
