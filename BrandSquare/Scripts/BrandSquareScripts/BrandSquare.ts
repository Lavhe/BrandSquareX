/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/materialize.d.ts" />
/// <reference path="typings/vue.d.ts" />

declare var WOW;
declare var toastr;

function LogOut(BrandName: string) {
    $.ajax({
        url: '/Brand/' + BrandName + '/LogOut',
        success: function (answer) {
            if (answer == "done") {
                window.location.reload();
            }
        }
    });
}

var LoggedInBrand: Brand = null;
var xImageModals: number = 0;

class Brand {
    ID: number;
    Name: string;
    Logo: string;
    constructor(ID, Name, Logo) {
        this.ID = ID;
        this.Name = Name;
        this.Logo = Logo;
    }
}

class PostCard {
    PosterName: string;
    PosterCategory: string;
    PosterImage: string;
    PostCategory: string;
    PostName: string;
    PostImage: string;
    PostPrice: number;
    PostDate: string;
    PostViews: string;
    PostContact: {
        Facebook: string,
        Twitter: string,
        Instagram: string
    }
    PostLineUp: string[];
    PostVenue: string;
}

Vue.component('x-upcoming-events', {
    template: `
                <div>
                    <div v-for="post in Posts">
                       <x-eventcard :post-card="post"></x-eventcard>
                    </div>
                    <x-loading v-if="LoadingPosts"></x-loading>
                </div>
            `,
    data: function () {
        return {
            Posts: new Array<PostCard>(),
            LoadingPosts: false
        }
    }, mounted: function () {
        var self = this;
        self.LoadingPosts = true;
        $.ajax({
            url: '/event/getUpComing',
            success: function (answer: any) {
                if (answer[0] == "No More Posts") {
                    console.log("No More events Posts");
                } else {
                    var posts: Array<any> = JSON.parse(answer);

                    for (var i = 0; i < posts.length; i++) {
                        console.log(posts[i]);
                        self.Posts.push({ post: posts[i], Type: true });
                    }
                }
                self.LoadingPosts = false;
            }
        });
    }
});

Vue.component('x-eventcard', {
    template: `
     <div>
<div class="card-wrapper" role="button">
            <div class="card-rotating effect__click" v-bind:class="{'flipped':Flipped}" id="card-i">
                <div class="face front">
                    <div class="card">
                        <div class="card-title">
                            <div class="Post_Header row">
                                <div class="Post_Header_Img col-xs-1 text-xs-left left">
                                    <x-image-modal 
                                                                          v-bind:img-src="post.PosterImage"></x-image-modal>
                                </div>
                                <div class="Post_Header_Left col-xs-9 row">
                                    <div class="col-xs-12 text-xs-left">
                                        <h4 class="h4-responsive"><a :href="'/brand/' + post.PosterName">{{ post.PosterName }}</a></h4>
                                    </div>
                                    <div class="col-xs-12 text-xs-left">
                                        <span><a>{{ post.PosterCategory }}</a></span> <i class="fa fa-dot-circle-o"></i> {{ post.PostCategory }}
                                    </div>
                                </div>
                                <div class="Post_Header_Right col-xs-2 text-xs-right right">
                                    <div class="tag tag-danger">R{{ post.PostPrice }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="card-block text-xs-center">
                            <div class="view overlay hm-white-slight text-xs-center flex-center">
                                <h2 class="text-xs-center h2-responsive">
                                    {{ post.PostName }}
                                </h2>
                                <a>
                                    <div class="mask"></div>
                                </a>
                            </div>
                        </div>

                        <div class="card-share">
                            <div class="social-reveal">
                                <a type="button" class="btn-floating btn-fb"><i class="fa fa-facebook"></i></a>
                                <a type="button" class="btn-floating btn-tw"><i class="fa fa-twitter"></i></a>
                                <a type="button" class="btn-floating btn-gplus"><i class="fa fa-instagram"></i></a>
                            </div>
                            <a class="btn-floating btn-action share-toggle white"><i class="fa fa-share-alt black-text"></i></a>
                        </div>

                        <div class="card-link row Post_Footer">
                            <div class="col-xs-3">
                                <a class="left btn btn-floating btn-small waves-effect waves-circle transparent activator"><i class="fa fa-phone green-text animated tada infinite"></i></a>
                            </div>
                            <div class="col-xs-6 text-xs-center">
                                <a v-bind:class="{'left btn btn-info-outline btn-sm waves-effect rotate-btn':true}" v-on:click="Flipped=true" data-card="card-i">Line Up</a>
                            </div>
                            <div class="col-xs-3">
                                <br />
                                <span class="center text-xs-center small comment-date Post_Body_Date">{{ post.PostDate }}</span>
                            </div>
                        </div>

                        <div class="card-reveal">
                            <div class="content text-xs-center">
                                <h6 class="card-title">Contact US<i class="fa fa-close"></i></h6>
                                <hr>
                                <ul class="list-group">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="face back">
                    <h6><i class="fa fa-map-marker"></i> {{post.PostVenue}}  <a class="rotate-btn right text-xs-right" v-on:click="Flipped=false" data-card="card-i"><i class="fa fa-close"></i></a></h6>
                    <hr>
                    <ul class="list-group" style="height:80%;overflow-y:scroll" v-for="lineUp in post.PostLineup">
                        <li class="list-group-item">{{ lineUp }}</li>
                    </ul>
                </div>
            </div>
        </div>
     <div>`,
    props: ['postCard'],
    data: function () {
        return {
            Flipped: false
        }
    },
    mounted: function () {
        $(window).resize();
    },
    computed: {
        post: {
            get: function () {
                return this.postCard.post;
            },
            set: function (val) {
                this.postCard = val;
            },
        },
    }
});

Vue.component('x-salescard', {
    template: `<div>
        <div class="card narrower">
            <div class="card-title">
                <div class="Post_Header row">
                    <div class="Post_Header_Img col-xs-1 text-xs-left left">
                        <x-image-modal 
                                      v-bind:img-src="post.PosterImage"></x-image-modal>
                    </div>
                    <div class="Post_Header_Left col-xs-9 row">
                        <div class="col-xs-12 text-xs-left">
                            <h4 class="h4-responsive"><a :href="'/brand/' + post.PosterName">{{ post.PosterName }}</a></h4>
                        </div>
                        <div class="col-xs-12 text-xs-left">
                            <span><a>{{ post.PosterCategory }}</a></span> <i class="fa fa-dot-circle-o"></i> {{ post.PostCategory }}
                        </div>
                    </div>
                    <div class="Post_Header_Right col-xs-2 pull-right">
                        <div class="tag tag-danger">NEW</div>
                    </div>
                </div>
            </div>
            <div class="view hm-zoom hm-white-strong overlay text-xs-center flex-center waves-effect">
                <img v-bind:src="post.PostImage" style="width:100%;height:100%" class="img-fluid " alt="">
                <div class="mask flex-center">
                    <p class="black-text">{{post.PostName}}</p>
                </div>
            </div>
            <div class="card-share">
                <div class="social-reveal">
                    <a type="button" class="btn-floating btn-fb"><i class="fa fa-facebook"></i></a>
                    <a type="button" class="btn-floating btn-tw"><i class="fa fa-twitter"></i></a>
                    <a type="button" class="btn-floating btn-gplus"><i class="fa fa-instagram"></i></a>
                </div>
                <a class="btn-floating btn-action share-toggle white"><i class="fa fa-share-alt black-text"></i></a>
            </div>
            <div class="card-link row Post_Footer">
                <div class="col-xs-3">
                    <a class="btn btn-floating btn-small waves-effect waves-circle transparent activator"><i class="fa fa-phone green-text animated tada infinite"></i></a>
                </div>
                <div class="col-xs-6 center text-xs-center animated pulse infinite">
                    <span class="center tag tag-danger">
                        {{post.PostPrice}}
                    </span>
                </div>
            </div>
            <div class="card-reveal">
                <div class="content text-xs-center">
                    <h4 class="card-title">Social shares <i class="fa fa-close"></i></h4>
                    <hr>
                </div>
            </div>
         </div>
    </div>`,
    props: ['postCard'],
    mounted: function () {

    },
    computed: {
        post: {
            get: function () {
                return this.postCard.post;
            },
            set: function (val) {
                this.postCard = val;
            },
        },
    }
});

function Initialize() {
    $('.mdb-select').material_select();
    $('.datepicker').pickadate({
    });
}

Vue.component('x-login', {
    template: `<div class="modal fade modal-ext" id="modal-login" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3><i class="fa fa-lock"></i> Login</h3>
                    </div>
                    <div class="modal-body">
                        <div v-if="!LoginBrandNameFound">
                            <div class="md-form">
                                <i class="fa fa-user prefix"></i>
                                <input type="text" id="LoginBrandname" v-model="LoginBrandname" v-on:keyup.enter="SubmitLoginBrandName" class="form-control" v-bind:class="{'invalid':LogInFailed}">
                                <label for="LoginBrandname">Brand Name</label>
                            </div>
                            <div class="md-form">
                                <span class="red-text text-xs-center">{{LogInFailedText}}</span>
                            </div>
                            <div class="text-xs-center">
                                <x-loading v-if="LoadingLoginBrandName"></x-loading>
                                <button v-if="!LoadingLoginBrandName" class="btn btn-primary btn-lg" v-bind:class="{'animated shake':LogInFailed}" v-on:click="SubmitLoginBrandName">Next</button>
                            </div>

                            <div class="modal-footer">
                                <div class="options">
                                    <p>Not a member? <a href="#">Sign Up</a></p>
                                </div>
                            </div>
                        </div>
                        <div v-if="LoginBrandNameFound">
                            <section class="section team-section">
                                <div class="row">
                                    <span class="text-xs-right right" role="button" v-on:click="LoginBrandNameFound = false">
                                        Switch Account
                                    </span>
                                    <div class="col-md-6 offset-md-3 col-xs-12 m-b-r text-xs-center">
                                        <div class="avatar">
                                            <img v-bind:src="LoginBrandlogo" class="img-circle">
                                        </div>
                                        <h4>{{LoginBrandname}}</h4>
                                        <div class="md-form">
                                            <input type="password" v-model="LogIn_Password" placeholder="Password..." v-on:keyup.enter="SubmitLogin" v-bind:class="{'invalid':LogInFailed}" class="form-control text-xs-center">
                                        </div>
                                        <div class="md-form">
                                            <span class="red-text text-xs-center">{{LogInFailedText}}</span>
                                        </div>
                                        <div class="text-xs-center">
                                              <x-loading v-if="LoadingLoginBrandPassword"></x-loading>                                                 
                                              <button v-if="!LoadingLoginBrandPassword" class="btn btn-primary btn-lg" v-bind:class="{'animated shake':LogInFailed}" v-on:click="SubmitLogin">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div class="modal-footer">
                                <div class="options row">
                                    <span class="text-xs-left">
                                        Forgot <a class="waves-effect" href="#">Password?</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,
    data: function () {
        return {
            LogInFailed: false,
            LogIn_Password: '',
            LogInFailedText: '',
            LoadingLoginBrandName: false,
            LoadingLoginBrandPassword: false
        };
    },
    props: ['LoginBrandNameFound', 'LoginBrandname', 'LoginBrandlogo'],
    methods: {
        SubmitLoginBrandName: function () {
            this.LoadingLoginBrandName = true;
            this.LogInFailed = false;
            this.LogInFailedText = this.LoadingDiv;
            if (this.LoginBrandname.length < 3) {
                this.LogInFailedText = "BrandName too short";
                this.LogInFailed = true;
                this.LoadingLoginBrandName = true;
            } else {
                $.ajax({
                    method: 'POST',
                    url: "/Brand/" + this.LoginBrandname + "/FindBrand",
                    success: (answer: string) => {
                        if (answer.indexOf("Error") >= 0) {
                            this.LogInFailedText = answer;
                            this.LogInFailed = true;
                        } else {
                            var brand = JSON.parse(answer);
                            this.LoginBrandname = brand.Name;
                            this.LoginBrandlogo = brand.Logo;
                            this.LoginBrandNameFound = true;
                            this.LogInFailedText = '';
                            this.LogInFailed = false;
                        }
                        this.LoadingLoginBrandName = false;
                    }
                });
            }
        },
        SubmitLogin: function () {
            this.LoadingLoginBrandPassword = true;
            this.LogInFailedText = '';
            this.LogInFailed = false;
            if (this.LogIn_Password.length < 3) {
                this.LoadingLoginBrandPassword = false;
                this.LogInFailedText = "BrandPassword too short";
                this.LogInFailed = true;
            } else {
                $.ajax({
                    method: 'POST',
                    url: "/Brand/" + this.LoginBrandname + "/Login?password=" + this.LogIn_Password,
                    success: (answer: string) => {
                        if (answer != "Done") {
                            this.LogInFailedText = answer;
                            this.LogInFailed = true;
                            this.LoadingLoginBrandPassword = false;
                        } else {
                            window.location.href = "/Brand/" + this.LoginBrandname;
                        }
                    }
                });
            }
        }
    }
});

Vue.component('x-posts', {
    template: `
          <div>
             <div class="row">
                 <div class="col-xs-12">
                    <ul class="nav nav-tabs md-pills pills-success PostTypeChooser">
                        <li class="nav-item">
                            <a class="nav-link" v-on:click="showType('all')" v-bind:class="{'active':showSales && showEvents}">all</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" v-on:click="showType('sales')" v-bind:class="{'active':showSales && !showEvents}" role="tab">sales</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" v-on:click="showType('events')" v-bind:class="{'active':!showSales && showEvents}"  role="tab">events</a>
                        </li>
                    </ul>
                </div>
             </div>
             <div class="row" v-for="post in Posts">
                <div v-if="post.Type && showEvents" class="col-xs-12 col-md-10 offset-md-1">
                    <x-eventcard :post-card="post"></x-eventcard>
                </div>
                <div v-if="!post.Type && showSales" class="col-xs-12 col-md-10 offset-md-1">
                    <x-salescard :post-card="post"></x-salescard>
                </div>
            </div> 
            <x-loading v-if="LoadingPosts"></x-loading>
         </div> `,
    data: function () {
        return {
            LoadingPosts: false,
            BrandID: '',
            Posts: new Array(),
            EventPostIndex: 0,
            SalesPostIndex: 0,
            showSales: true,
            showEvents: true
        }
    },
    mounted: function () {
        this.getPosts(this.postBrand, this.postType);
        $(window).scroll();
    },
    props: ['postBrand', 'postType'],
    methods: {
        showType: function (value: string) {
            $(window).scroll();
            if (value == 'sales') {
                this.showSales = true;
                this.showEvents = false;
            } else if (value == 'events') {
                this.showSales = false;
                this.showEvents = true;
            } else {
                this.showSales = true;
                this.showEvents = true;
            }
        },
        getPosts: function (brandID: number = 0, type: string = "all") {
            var self = this;
            var eventIN = false;
            var saleIN = false;
            var rand: number = 0;
            $(window).scroll((e) => {
                if ($(e.currentTarget).scrollTop() + $(window).height() >= ($(document).height() - $('#FooterX').height() - 200)) {

                    rand = Math.floor((Math.random() * 2) + 1);
                    self.LoadingPosts = true;

                    if (rand === 1) {
                        if (!eventIN) {
                            eventIN = true;
                            $.ajax({
                                url: '/event/getpost?brandID=' + brandID + '&index=' + self.EventPostIndex,
                                success: function (answer) {
                                    if (answer == "No More Posts") {
                                        console.log("No More events Posts");
                                    } else {
                                        var result: PostCard = JSON.parse(answer);
                                        self.Posts.push({ post: result, Type: true });
                                        self.EventPostIndex++;
                                    }
                                    eventIN = false;
                                    self.LoadingPosts = false;
                                }
                            });
                        }
                    } else {
                        if (!saleIN) {
                            saleIN = true;
                            $.ajax({
                                url: '/sale/getpost?brandID=' + brandID + '&index=' + self.SalesPostIndex,
                                success: function (answer) {
                                    if (answer == "No More Posts") {
                                        console.log("No More sales Posts");
                                    } else {
                                        var result: PostCard = JSON.parse(answer);
                                        self.Posts.push({ post: result, Type: false });
                                        self.SalesPostIndex++;
                                    }
                                    saleIN = false;
                                    self.LoadingPosts = false;
                                }
                            });
                        }
                    }
                }
            });
        }
    }
});

Vue.component('x-image-modal', {
    template: `
                <div class="xImageModal">
                    <div class="waves-effect hm-white-strong view hm-zoom overlay" data-toggle="modal" v-bind:data-target="'#' +imgId" style="border-radius:50%">
                        <img v-bind:src.once="imgSrc" class="" style="width:100%;height:100%" />
                        <p class="mask flex-center">
                            <i class="fa fa-eye black-text fa-2x"></i>
                        </p>
                    </div>
                    <div class="modal fade transparent fullSize" v-bind:id="imgId" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg transparent fullSize">
                            <div class="modal-content transparent fullSize">
                                <div class="modal-header">
                                    <button type="button" class="close red-text" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <img v-bind:src.once="imgSrc" class="img-fluid" style="width:100%;height:100%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
    methods: {
        DisplayImage: function () {

        }
    }, mounted: function () {
    }, data: function () {
        return {
            imgId: xImageModals++
        }
    },
    props: ['imgSrc']
});

Vue.component('x-loading', {
    template: `<div>
                    <div class="loadingDivFather">
                        <div class="loading loadingDiv">
                            <div class="bullet">L</div>
                            <div class="bullet">o</div>
                            <div class="bullet">a</div>
                            <div class="bullet">d</div>
                            <div class="bullet">i</div>
                            <div class="bullet">n</div>
                            <div class="bullet">g</div>
                        </div>
                    </div>
              </div>`
});



Vue.component('x-addSales', {
    template: `
            <div>
            <div class="row card animated rotateInDownRight">
                <div class="col-xs-12 row">
                    <div class="col-md-6">
                        <div class="image-editor row depth-z-0 center text-xs-center">
                                <div class="file-field text-xs-center col-md-6 offset-md-3">
                                    <div role="button" class="btn btn-primary center text-xs-center btn-sm waves-effect">
                                        <span>Select Image to Upload</span>
                                        <input type="file" accept="image/*" v-on:click="AttachCropIt" class="cropit-image-input" />
                                    </div>
                                </div>
                            </div>
                            <div class="md-form form-group">
                                <textarea class="md-textarea" v-model="Sales_Description" v-bind:class="{'invalid':SalesDescriptionError,'valid':!SalesDescriptionError}" length="20"></textarea>
                        </div>
                        <hr />
                        <div class="md-form input-group">
                            <span class="input-group-addon">R</span>
                            <input type="number" v-model.number="Sales_Price" v-bind:class="{'invalid':SalesPriceError,'valid':!SalesPriceError}" class="form-control" length="4" aria-label="Amount (to the nearest Rand)">
                            <span class="input-group-addon">.00</span>
                        </div>
                        <hr />
                        <div class="md-form">
                            <select class="mdb-select" v-model="SalesCategory">
                                <optgroup label="Music">
                                    <option value="Album Launch">Album Launch</option>
                                    <option value="Artist Birthday">Artist Birthday</option>
                                </optgroup>
                                <optgroup label="Fashion">
                                    <option value="Fashion Show">Fashion Show</option>
                                    <option value="Just Nje!">Just Nje!</option>
                                </optgroup>
                            </select>
                            <label>Event Type</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                            <div class="card narrower">
                                <div class="card-title">
                                    <div class="Post_Header row">
                                        <div class="Post_Header_Img col-xs-1 text-xs-left left">
                                            <img v-bind:src="LoggedInBrand.Logo" style="width:100%;height:100%" id="TheImage" class="img-fluid" />
                                        </div>
                                        <div class="Post_Header_Left col-xs-9 row">
                                            <div class="col-xs-12 text-xs-left">
                                                <h4 class="h4-responsive"><a>{{ LoggedInBrand.Name }}</a></h4>
                                            </div>
                                            <div class="col-xs-12 text-xs-left">
                                                <span><a>{{ LoggedInBrand.Category }}</a></span> <i class="fa fa-dot-circle-o"></i> {{ SalesCategory }} Event
                                            </div>
                                        </div>
                                        <div class="Post_Header_Right col-xs-2 text-xs-right right">
                                            <div class="tag tag-danger">NEW</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pull-xs-right" style="border:1px solid black">
                                        <div style="width:20px;height:20px" v-on:click="DescriptionText(false)" class="white waves-effect col-xs-1" role="button"></div>
                                        <div style="width:20px;height:20px" v-on:click="DescriptionText(true)" class="black waves-effect col-xs-1" role="button"></div> 
                                </div>
                                <form class="range-field">
                                        <input id="TheZoomer" type="range" />
                                </form>
                                <a class="rotate-ccw ImageEdit btn-floating transparent waves-effect pull-xs-left" onclick="{$('.image-editor').cropit('rotateCCW');}"><i class="fa fa-rotate-left black-text"></i></a>
                                <a class="rotate-cw ImageEdit btn-floating transparent waves-effect pull-xs-right" onclick="{$('.image-editor').cropit('rotateCW');}"><i class="fa fa-rotate-right black-text"></i></a>
                                <div id="ThepicX" v-bind:class="{'hm-white-strong':DescriptionTextColour,'hm-black-strong':!DescriptionTextColour}" class="view hm-zoom overlay text-xs-center flex-center waves-effect">
                                    <img style="width:100%;height:100%" class="img-fluid " alt="">
                                    <div class="mask flex-center">
                                        <p v-bind:class="{'black-text':DescriptionTextColour,'white-text':!DescriptionTextColour}">{{ Sales_Description }}</p>
                                    </div>
                                </div>
                                          
                                <div class="card-share">
                                    <div class="social-reveal">
                                        <a type="button" class="btn-floating btn-fb"><i class="fa fa-facebook"></i></a>
                                        <a type="button" class="btn-floating btn-tw"><i class="fa fa-twitter"></i></a>
                                        <a type="button" class="btn-floating btn-gplus"><i class="fa fa-instagram"></i></a>
                                    </div>
                                    <a class="btn-floating btn-action share-toggle white"><i class="fa fa-share-alt black-text"></i></a>
                                </div>
                                <div class="card-link row Post_Footer">
                                    <div class="col-xs-3">
                                        <a class="btn btn-floating btn-small waves-effect waves-circle transparent activator"><i class="fa fa-phone green-text animated tada infinite"></i></a>
                                    </div>
                                    <div class="col-xs-6 center text-xs-center animated pulse infinite">
                                        <span class="center tag tag-danger">
                                            <span>R</span> {{ Sales_Price }}
                                        </span>
                                    </div>
                                </div>
                                    <div class="card-reveal">
                                        <div class="content text-xs-center">
                                               <h4 class="card-title">Social shares <i class="fa fa-close"></i></h4>
                                            <hr>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                            </div>
                            <div class="col-xs-12">
                                <a class="btn teal waves-effect waves-button export ImageEdit" style="width:100%" onclick="{ var imageData = $('.image-editor').cropit('export'); window.open(imageData); }">Save Changes</a>
                            </div>
                        </div>
                    </div>
                    `,
    data: function () {
        return {
            post: PostCard,
            ShowAddSales: false,
            ShowEvent_Sales: false,
            SalesDescription: 'Describe your product...',
            SalesDescriptionError: false,
            SalesPrice: '0',
            SalesPriceError: '0',
            SalesCategory: '',
            SalesImage: '',
            LoggedInBrand: Brand,
            DescriptionTextColour: true
        }
    },
    computed: {
        Sales_Description: {
            get: function () {
                return this.SalesDescription;
            },
            set: function (val) {
                if (val.length > 20) {
                    this.SalesDescriptionError = true;
                } else if (val.length <= 0) {
                    this.SalesDescriptionError = true;
                } else {
                    this.SalesDescriptionError = false;
                    this.SalesDescription = val;
                }
            },
        },
        Sales_Price: {
            get: function () {
                return this.SalesPrice;
            },
            set: function (val) {
                if (val.length > 4) {
                    this.SalesPriceError = true;
                } else if (val.length <= 0) {
                    this.SalesPrice = 0;
                    this.SalesPriceError = true;
                } else {
                    this.SalesPriceError = false;
                    this.SalesPrice = val;
                }
            },
        }
    },
    mounted: function () {
        this.AttachCropIt();
        Initialize();
        this.LoggedInBrand = LoggedInBrand;
    },
    methods: {
        DescriptionText: function (color) {
            this.DescriptionTextColour = color;
        },
        AttachCropIt: function () {
            $('.image-editor').cropit({
                maxZoom: 2,
                imageBackground: true,
                imageState: {
                    src: '/Content/images/avatars/img (10).jpg',
                },
                smallImage: 'allow',
                width: 410,
                height: 290,
                freeMove: true,
                $preview: $('#ThepicX'),
                $zoomSlider: $('#TheZoomer'),
                onZoomDisabled: function () {
                    $('#TheZoomer').hide('slow');
                },
                onZoomEnabled: function () {
                    $('#TheZoomer').show('slow');
                }
            });

        }
    }
});

Vue.component('x-addEvent', {
    template: `
                <div>
                    <div class="row jumbotron animated rotateInDownLeft">
                        <div class="col-xs-12">
                            <div class="card">
                                <div class="col-xs-3">
                                    <div class="md-form form-group">
                                        <textarea class="md-textarea" v-model="Event_Name" v-bind:class="{'invalid':EventNameError,'valid':!EventNameError}" length="20"></textarea>
                                    </div>
                                    <hr />
                                    <div class="md-form">
                                        <input placeholder="Select a date" type="date" v-model="EventDate" class="form-control datepicker">
                                    </div>
                                    <hr />
                                    <div class="md-form input-group">
                                        <span class="input-group-addon">R</span>
                                        <input type="number" v-model.number="Event_Price" v-bind:class="{'invalid':EventPriceError,'valid':!EventPriceError}" class="form-control" length="4" aria-label="Amount (to the nearest Rand)">
                                        <span class="input-group-addon">.00</span>
                                    </div>
                                    <hr />
                                    <div class="md-form">
                                        <select class="mdb-select" v-model="EventCategory">
                                            <optgroup label="Music">
                                                <option value="Album Launch">Album Launch</option>
                                                <option value="Artist Birthday">Artist Birthday</option>
                                            </optgroup>
                                            <optgroup label="Fashion">
                                                <option value="Fashion Show">Fashion Show</option>
                                                <option value="Just Nje!">Just Nje!</option>
                                            </optgroup>
                                        </select>
                                        <label>Event Type</label>
                                    </div>
                                </div>
                                <div class="col-xs-6">
                                    <div class="card-wrapper">
                                        <div class="card-rotating effect__click">
                                            <div class="face front">
                                                <div class="card">
                                                    <div class="card-title">
                                                        <div class="Post_Header row">
                                                            <div class="Post_Header_Img col-xs-1 text-xs-left left">
                                                                <img v-bind:src="LoggedInBrand.Logo" style="width:100%;height:100%" class="img-fluid" />
                                                            </div>
                                                            <div class="Post_Header_Left col-xs-9 row">
                                                                <div class="col-xs-12 text-xs-left">
                                                                    <h4 class="h4-responsive"><a>{{ LoggedInBrand.Name }}</a></h4>
                                                                </div>
                                                                <div class="col-xs-12 text-xs-left">
                                                                    <span><a>{{ LoggedInBrand.Category }}</a></span> <i class="fa fa-dot-circle-o"></i> {{ EventCategory }} Event
                                                                </div>
                                                            </div>
                                                            <div class="Post_Header_Right col-xs-2 text-xs-right right">
                                                                <div class="tag tag-danger">R{{Event_Price}}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="card-block text-xs-center">
                                                        <div class="view overlay hm-white-slight text-xs-center flex-center">
                                                            <h2 class="text-xs-center h2-responsive">
                                                                {{Event_Name}}
                                                            </h2>
                                                            <a>
                                                                <div class="mask"></div>
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div class="card-share">
                                                        <div class="social-reveal">
                                                            <a class="btn-floating btn-fb"><i class="fa fa-facebook"></i></a>
                                                            <a class="btn-floating btn-tw"><i class="fa fa-twitter"></i></a>
                                                            <a class="btn-floating btn-gplus"><i class="fa fa-instagram"></i></a>
                                                        </div>
                                                        <a class="btn-floating btn-action share-toggle white"><i class="fa fa-share-alt black-text"></i></a>
                                                    </div>

                                                    <div class="card-link row Post_Footer">
                                                        <div class="col-xs-3">
                                                            <a class="left btn btn-floating btn-small waves-effect waves-circle transparent activator"><i class="fa fa-phone green-text animated tada infinite"></i></a>
                                                        </div>
                                                        <div class="col-xs-6 text-xs-center">
                                                            <a class="left btn btn-info-outline btn-sm waves-effect rotate-btn" id="BtnEventGoToLineup" data-card="EventCard___Model.BrandID">Line Up</a>
                                                        </div>
                                                        <div class="col-xs-3">
                                                            <br />
                                                            <span class="center text-xs-center small comment-date Post_Body_Date">{{EventDate}}</span>
                                                        </div>
                                                    </div>

                                                    <div class="card-reveal">
                                                        <div class="content text-xs-center">
                                                            <h6 class="card-title">Contact US<i class="fa fa-close"></i></h6>
                                                            <hr>
                                                            <ul class="list-group">
                                                                <li class="list-group-item">Facebook</li>
                                                                <li class="list-group-item">Twitter</li>
                                                                <li class="list-group-item">Instagram</li>
                                                                <li class="list-group-item">FBI Crew</li>
                                                                <li class="list-group-item">John Cena</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="face back">
                                                <h6><i class="fa fa-map-marker"></i> Makhuvha Stadium   <a class="rotate-btn right text-xs-right" data-card="EventCard___Model.BrandID"><i class="fa fa-close"></i></a></h6>
                                                <hr>
                                                <ul class="list-group" id="EventLineUp" style="height:80%;overflow-y:scroll">
                                                    <li class="list-group-item">
                                                        <span class="tag transparent label-pill pull-xs-right"><i class="fa fa-trash fa-2x red-text"></i>Mizo Phyll</span>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <span class="tag transparent label-pill pull-xs-right"><i class="fa fa-trash fa-2x red-text"></i>Racha Kill</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="md-form form-group">
                                        <label for="TxtEventLineup">Line Up</label>
                                        <input v-on:keyup.enter="AddToLineup" placeholder="+Artist" v-model="TxtEventLineup" id="TxtEventLineup" class="md-textarea XBindable" data-ParentDiv="#EventCard___Model.BrandID" data-XBindie="#CurrentEventLineup" length="20" type="text" />
                                    </div>
                                    <div class="row">
                                        <div class="chips col-xs-12">
                                            <div class="chip" v-on:click="RemoveCurrentLineup(value)" role="button" v-for="value in Lineup">
                                                {{value}} <i class="close"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12">
                                <a class="btn teal waves-effect waves-button" style="width:100%">Save Changes</a>
                            </div>
                        </div>
                    </div>
                </div>    
            `,
    data: function () {
        return {
            TxtEventLineup: '',
            Lineup: ['Uzzie', 'Joe', 'Me'],
            post: PostCard,
            EventName: 'Name of event...',
            EventNameError: false,
            EventDate: '',
            EventPrice: '0',
            EventPriceError: '0',
            EventCategory: '',
            LoggedInBrand: Brand
        }
    },
    computed: {
        Event_Name: {
            get: function () {
                return this.EventName;
            },
            set: function (val) {
                if (val.length > 20) {
                    this.EventNameError = true;
                } else if (val.length <= 0) {
                    this.EventNameError = true;
                } else {
                    this.EventNameError = false;
                    this.EventName = val;
                }
            },
        },
        Event_Price: {
            get: function () {
                return this.EventPrice;
            },
            set: function (val) {
                if (val.length > 4) {
                    this.EventPriceError = true;
                } else if (val.length <= 0) {
                    this.EventPrice = 0;
                    this.EventPriceError = true;
                } else {
                    this.EventPriceError = false;
                    this.EventPrice = val;
                }
            },
        }
    },
    mounted: function () {
        $(window).resize();
        Initialize();
        this.LoggedInBrand = LoggedInBrand;
    },
    methods: {
        AddToLineup: function () {
            var value = this.TxtEventLineup;
            if (value.length > 2) {
                this.Lineup.push(value);
                this.TxtEventLineup = '';
            }
        },
        RemoveCurrentLineup: function (value: string) {
            var index = this.Lineup.indexOf(value);
            if (index >= 0) {
                this.Lineup.splice(index, 1);
            }
        },
    }
});


Vue.component('x-latestnews', {
    template: ` 
        <div>                
            <div class="card card-block fullWidth">
                <div class="row">
                    <div class="col-xs-12 text-xs-center green-text">
                        <h5>Latest news</h5>
                    </div>
                    <div v-for="news in latestNews" class="col-xs-12">
                        <x-status :poster-link.once="'/Brand/' + news.PosterName"
                                  :message.once="news.StatusMessage"
                                  :date-time="news.StatusTime"
                                  :poster-name="news.PosterName"
                                  has-name="true"></x-status>
                    </div>
                </div>
            </div>
        </div>
            `,
    data:function() {
        return{
            latestNews:new Array<string[]>()
        }
    },
    mounted: function () {
        var self = this;
        $.ajax({
            url: '/Home/GetLatestNews',
            success: function (answer) {
                self.latestNews = JSON.parse(answer);
                
            }, error:function(){
                toastr.error("System error : jbrgwfeoipqevmfbdk");
            }
        });
    }
});

Vue.component('x-status', {
    template: `
            <div class="card card-block grey lighten-5">
                <div class="row">
                    <div class="col-xs-7 green-text">
                        <label v-if="hasName != 'true'">Status</label>
                        <a v-if="hasName =='true'" v-bind:href.once="posterLink">
                            <label>
                                {{ posterName }}
                            </label>
                        </a>
                     </div>
                    <div class="col-xs-5 pull-right text-xs-right" data-toggle="tooltip" data-placement="top" :title="dateTime" role="button">
                        <p class="small fullWidth">
                            <small>
                                  <i class="fa fa-clock-o"></i>
                                  {{ dateTime }}
                            </small>
                        </p>
                    </div>
                    <div class="col-xs-12 text-xs-center">
                        <p class="card-teStatus1xt fullWidth">
                           {{ message }} 
                        </p>
                    </div>
                </div>
            </div>
            `,
    props:['dateTime','message','posterName','posterLink','hasName']
});


$(window).resize(() => {
    $('.card-wrapper').css('height', $('.card-wrapper').find('.card').css('height'));
});

$(document).ready(function () {
    //This is the Home page
    if ($('body[Home]').html() != undefined) {

    } else
        //This is the Brand's Controller in general
        if ($('html').find('.BrandController').html() != undefined) {

            Vue.component('x-editevent-sales', {
                template: `<div>
                    <div class="row card card-outline-success classic-admin-card">
                            <div class="col-xs-12">
                                <div class="card-block text-xs-center flex-center fullWidth">
                                    <a class="btn btn-flat waves-button waves-effect fullWidth" v-bind:class="{'grey lighten-2':ShowEvent_SalesEdit}" v-on:click="ShowEvent_SalesEditClick"><span class="black-text">Edit Existing Content</span></a>
                                </div>
                            </div>
                            <div class="col-xs-12 row" v-if="ShowEvent_SalesEdit">
                                <div class="col-xs-6 text-xs-center">
                                    <a class="btn btn-flat waves-button waves-effect" v-bind:class="{'grey lighten-2':ShowEditEvent}" v-on:click="ShowEditEventClick">
                                        <span class="black-text">Event</span>
                                    </a>
                                </div>
                                <div class="col-xs-6 text-xs-center">
                                    <a class="btn btn-flat waves-button waves-effect" v-bind:class="{'grey lighten-2':ShowEditSales}" v-on:click="ShowEditSalesClick">
                                        <span class="black-text">Sales</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                 </div>`,
                data: function () {
                    return {
                        ShowEditEvent: false,
                        ShowEditSales: false,
                        ShowEvent_SalesEdit: false,
                    }
                }, methods: {
                    ShowEditSalesClick: function () {
                        this.ShowEditSales = !this.ShowEditSales;
                        this.ShowEditEvent = false;
                    },
                    ShowEvent_SalesEditClick: function () {
                        this.ShowEvent_SalesEdit = !this.ShowEvent_SalesEdit;
                    },
                    ShowEditEventClick: function () {
                        this.ShowEditEvent = !this.ShowEditEvent;
                        this.ShowEditSales = false;
                    }
                }
            });

            Vue.component('x-socials', {
                template: `
                         <div>
                            <ul class="social-list z-depth-0 inline-ul row">
                                <li class="col-xs-2"><a v-bind:href.once="e_socialEmailAddress" class="icons-sm email-ic waves-effect socialsAnimate"><i class="fa fa-envelope-o"> </i> <span>Email</span></a></li>
                                <li class="col-xs-2"><a v-bind:href.once="e_socialFacebook" class="icons-sm fb-ic waves-effect socialsAnimate"><i class="fa fa-facebook"></i> <span>Facebook</span></a></li>
                                <li class="col-xs-2"><a v-bind:href.once="e_socialTwitter" class="icons-sm tw-ic waves-effect socialsAnimate"><i class="fa fa-twitter"></i> <span>Twitter</span></a></li>
                                <li class="col-xs-2"><a v-bind:href.once="e_socialInstagram" class="icons-sm ins-ic waves-effect socialsAnimate"><i class="fa fa-instagram"> </i> <span>Instagram</span></a></li>
                                <li class="col-xs-2"><a v-bind:href.once="e_socialWebsite" class="icons-sm yt-ic waves-effect socialsAnimate"><i class="fa fa-globe prefix"> </i><span>Website</span></a></li>
                                <li class="col-xs-2"></li>
                            </ul>
                        </div>
          `,
                data: function () {
                    return {

                    }
                },
                props: ['e_socialEmailAddress', 'e_socialFacebook', 'e_socialInstagram', 'e_socialTwitter', 'e_socialWebsite']
                ,
                mounted: function () {
                    $('.socialsAnimate').find('span').hide();
                    $('.socialsAnimate').mouseenter((e) => {
                        $(e.currentTarget).find('span').show('fast');
                    });
                    $('.socialsAnimate').mouseleave((e) => {
                        $(e.currentTarget).find('span').hide('fast');
                    });
                }
            });


            Vue.component('x-addsomething', {
                template: `
                <div>
                    <div class="row text-xs-center transparent">
                        <div v-if="!isAdd && !isRemove && isStatus" class="col-xs-4 col-md-4">
                            <div class="card card-block hoverable waves-effect grey lighten-1" role="button">
                                <p class="text-xs-center flex-center">
                                    Status
                                </p>
                            </div>
                        </div>
                        <div v-if="!isRemove" class="col-xs-4 col-md-4" v-bind:class="{'col-xs-12 col-md-12':isAdd}">
                            <div class="card card-block" v-bind:class="{'white lighten-1':isAdd,'hoverable waves-effect':!isAdd}" role="button">
                                <div v-if="!isAdd" class="fullSize X_text-Green" v-on:click="isAdd = !isAdd">
                                    <h3 class="text-xs-center flex-center">
                                        Add
                                    </h3>
                                </div>
                                <div v-else>
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <a class="pull-right close red-text" v-on:click="isAdd = !isAdd;addSales = false;addEvent = false"><i class="fa fa-close red-text"></i></a>
                                            <h2>Add post</h2>
                                        </div>
                                        <div class="col-xs-6">
                                            <a class="btn btn-success waves-effect black-text" v-bind:class="{'z-depth-5':addEvent,'z-depth-0':!addEvent}" v-on:click="addEvent = true;addSales = false;">
                                                Event
                                            </a>
                                        </div>
                                        <div class="col-xs-6">
                                            <a class="btn btn-success waves-effect black-text" v-bind:class="{'z-depth-5':addSales,'z-depth-0':!addSales}" v-on:click="addSales = true;addEvent = false;">
                                                Sales
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="!isAdd" class="col-xs-4 col-md-4" v-bind:class="{'col-xs-12 col-md-12':isRemove}">
                            <div class="card card-block" v-bind:class="{'white lighten-1':isRemove,'hoverable waves-effect':!isRemove}" role="button">
                                <div v-if="!isRemove" class="fullSize red-text" v-on:click="isRemove = !isRemove">
                                    <h3 class="text-xs-center flex-center">
                                        Remove
                                    </h3>
                                </div>
                                <div v-else>
                                    <div class="row">
                                       <div class="col-xs-12">
                                            <a class="pull-right close red-text" v-on:click="isRemove = !isRemove;removeSales = false;removeEvent = false"><i class="fa fa-close red-text"></i></a>
                                            <h2>Remove post</h2>
                                        </div>
                                        <div class="col-xs-6">
                                            <a class="btn btn-success waves-effect black-text" v-bind:class="{'z-depth-5':removeEvent,'z-depth-0':!removeEvent}" v-on:click="removeEvent = true;removeSales = false;">
                                                Event
                                            </a>
                                        </div>
                                        <div class="col-xs-6">
                                            <a class="btn btn-success waves-effect black-text" v-bind:class="{'z-depth-5':removeSales,'z-depth-0':!removeSales}" v-on:click="removeSales = true;removeEvent = false;">
                                                Sales
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                        <!--Status text -->
                        <div v-if="!isAdd && !isRemove && isStatus" class="row">
                            <div class="col-xs-12 col-md-8 offset-md-2">
                                <div class="card card-block grey lighten-5">
                                    <div class="row">
                                        <div class="col-xs-6 green-text">
                                            <label>Current status</label>
                                        </div>
                                        <div class="col-xs-6 pull-right text-xs-right" data-toggle="tooltip" data-placement="top" title="Today" role="button">
                                            <i class="fa fa-clock-o"></i>
                                            <span class="small small-tag">
                                                <label>12:10 </label>
                                            </span>
                                        </div>
                                        <div class="col-xs-12 text-xs-center">
                                            <p class="card-text fullWidth">
                                                <textarea id="txtStatus" class="md-textarea" v-bind:class="{'red-text':txtStatusCounter < 0}" length="100" v-model="txtStatus"></textarea>
                                                <label for="txtStatus">Update current situation</label>
                                            </p>
                                        </div>
                                        <hr style="width:100%" />
                                        <div class="col-xs-12">
                                            <label class="text-xs-right pull-right small">
                                                <sup>{{ txtStatusCounter }}</sup>
                                            </label>
                                            <a class="btn btn-success fullWidth" v-on:click="UpdateStatus" v-bind:class="{'disabled':txtStatusCounter < 0}">Update</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 col-sm-10 offset-sm-1">
                                <br />
                                <x-addSales v-if="addSales"></x-addSales>
                                <x-addEvent v-if="addEvent"></x-addEvent>
                            </div>
                        </div>
                    </div>
                </div>
                        `,
                data: function () {
                    return {
                        isStatus: true,
                        isAdd: false,
                        isRemove: false,
                        addSales: false,
                        addEvent: false,
                        removeSales: false,
                        removeEvent: false,
                        txtStatusCounter: 100,
                        brandStatus: ''
                    }
                },
                methods: {
                    UpdateStatus: function () {
                        
                        this.txtStatus 
                        $.ajax({
                            url: '/brand/r/UpdateStatus?Message=' + this.txtStatus,
                            success: function (answer) {
                                if (answer == "done") {
                                    toastr.success("Status updated");
                                }
                                else {
                                    toastr.error(answer);
                                }
                            },
                            error: function () {
                                toastr.error("System error : ghiweojpfq39t208uhvk");
                            }
                        });
                    }
                },
                computed: {
                    txtStatus: {
                        get: function () {
                            return this.brandStatus;
                        },
                        set: function (val: string) {
                            this.txtStatusCounter = (100 - val.length);
                            if (this.txtStatusCounter > 0) {
                                this.brandStatus = val;
                            }
                        },
                    }
                }
            });

            Vue.component('x-editbrand', {
                template: `
           <div>
                <div class="row text-xs-center transparent">
                    <div class="col-xs-4">
                        <a class="btn waves-effect lighten-2" v-bind:class="{'black':settingGeneral,'red btn-flat':!settingGeneral}" v-on:click="showSetting('settingGeneral')">General</a>
                    </div>
                    <div class="col-xs-4">
                        <a class="btn waves-effect lighten-2" v-bind:class="{'black':settingSocialMedia,'red btn-flat':!settingSocialMedia}" v-on:click="showSetting('settingSocialMedia')">Social Media</a>
                    </div>
                    <div class="col-xs-4">
                        <a class="btn waves-effect lighten-2" v-bind:class="{'black':settingDeletePosts,'red btn-flat':!settingDeletePosts}" v-on:click="showSetting('settingDeletePosts')">Delete Posts</a>
                    </div>
                </div>


                <div class="row card" v-if="settingSocialMedia">
                    <div class="col-xs-6 offset-xs-3 row">
                        <h3 class="card-title text-xs-center h3-responsive">
                            Social Media
                        </h3>
                        <div class="col-xs-12 md-form input-group">
                            <i class="fa fa-envelope grey-text prefix"></i>
                            <input type="text" placeholder="Email Address" v-model="socialEmailAddress" />
                        </div>
                        <div class="col-xs-12 md-form input-group">
                            <i class="fa fa-facebook-f fb-ic prefix"></i>
                            <input type="text" placeholder="Facebook Page/Profile Link" v-model="socialFacebook"/>
                        </div>
                        <div class="col-xs-12 md-form input-group">
                            <i class="fa fa-twitter tw-ic prefix"></i>
                            <input type="text" placeholder="Twitter Profile Link" v-model="socialTwitter" />
                        </div>
                        <div class="col-xs-12 md-form input-group">
                            <i class="fa fa-instagram ins-ic prefix"></i>
                            <input type="text" placeholder="Instagram Profile Link" v-model="socialInstagram"/>
                        </div>
                        <div class="col-xs-12 md-form input-group">
                            <i class="fa fa-globe yt-ic prefix"></i>
                            <input type="text" placeholder="Website Link" v-model="socialWebsite" />
                        </div>
                        <div class="col-xs-12">
                            <a class="btn btn-large teal waves-effect waves-button" style="width:100%">Save Changes</a>
                        </div>
                    </div>
                </div>

                <div class="row card" v-if="settingDeletePosts">
                    <div class="col-xs-6 offset-xs-3 row">
                        <h3 class="card-title text-xs-center h3-responsive">
                            Delete Posts
                        </h3>
                        <div class="col-xs-12 row">
                            <div class="col-xs-6 text-xs-center">
                                <a class="btn waves-button waves-effect red lighten-2">
                                    <span class="black-text">Events</span>
                                </a>
                            </div>
                            <div class="col-xs-6 text-xs-center">
                                <a class="btn waves-button waves-effect red lighten-2">
                                    <span class="black-text">Sales</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row card" v-if="settingGeneral">
                    <div class="col-xs-6 offset-xs-3 row">
                        <h3 class="card-title text-xs-center h3-responsive">
                            General
                        </h3>
                        <div class="col-xs-12 md-form input-group">
                            <textarea id="TxtBio" class="md-textarea active" v-model="generalBio"></textarea>
                            <label for="TxtBio">Bio</label>
                        </div>
                        <div class="col-xs-12 md-form input-group">
                            <textarea id="TxtHomeAddress" class="md-textarea" v-model="generalHomeAddress"></textarea>
                            <label for="TxtHomeAddress">Home address</label>
                        </div>

                        <div class="col-xs-12">
                            <a class="btn teal waves-effect waves-button" v-on:click="changeBioHomeaddress" style="width:100%">Save Changes</a>
                        </div>

                        <div class="col-xs-6 offset-xs-3 md-form form-group">
                            <input type="checkbox" v-model="generalChangePassword" id="ChangePassword" />
                            <label for="ChangePassword">Change Password</label>
                        </div>

                        <div v-if="generalChangePassword"> 
                            <div class="col-xs-6 offset-xs-3 md-form form-group">
                                <i class="fa fa-lock prefix"></i>
                                <input placeholder="Current Password" id="OldPassword" type="password" />
                            </div>
                        
                            <div class="col-xs-12 row md-form card card-block" v-if="">
                                <div class="col-xs-6 md-form form-group">
                                    <i class="fa fa-lock prefix"></i>
                                    <input id="NewPassword" type="password" />
                                    <label for="NewPassword">New Password</label>
                                </div>
                                <div class="col-xs-6 md-form form-group">
                                    <i class="fa fa-lock prefix"></i>
                                    <input id="ConfirmNewPassword" type="password" />
                                    <label for="ConfirmNewPassword">Retype Password</label>
                                </div>
                                <div class="col-xs-12 text-xs-center">
                                    <x-loading v-if="passwordLoading"></x-loading>
                                    <span class="red-text">{{ passwordChangeError }}</span>
                                </div>
                                <div class="col-xs-12">
                                    <a class="btn teal waves-effect waves-button" v-on:click="changePasswordSaveChanges" style="width:100%">Save Passwords</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
   `,
                data: function () {
                    return {
                        settingGeneral: false,
                        settingDeletePosts: false,
                        settingSocialMedia: true,
                        socialEmailAddress: '',
                        socialFacebook: '',
                        socialInstagram: '',
                        socialTwitter: '',
                        socialWebsite: '',
                        generalChangePassword: false,
                        generalBio: '',
                        generalHomeAddress: '',
                        passwordChangeError: '',
                        passwordLoading: false
                    }
                },
                mounted: function () {
                    this.socialEmailAddress = this.e_socialEmailAddress;
                    this.socialFacebook = this.e_socialFacebook;
                    this.socialInstagram = this.e_socialInstagram;
                    this.socialTwitter = this.e_socialTwitter;
                    this.socialWebsite = this.e_socialWebsite;
                    this.generalBio = this.e_generalBio;
                    this.generalHomeAddress = this.e_generalHomeAddress;
                },
                props: ['e_generalBio', 'e_generalHomeAddress', 'e_socialEmailAddress', 'e_socialFacebook', 'e_socialInstagram', 'e_socialTwitter', 'e_socialWebsite'],
                methods: {
                    showSetting: function (value) {
                        if (value == 'settingGeneral') {
                            this.settingGeneral = true; this.settingDeletePosts = false; this.settingSocialMedia = false;
                        }
                        if (value == 'settingDeletePosts') {
                            this.settingDeletePosts = true; this.settingGeneral = false; this.settingSocialMedia = false;
                        }
                        if (value == 'settingSocialMedia') {
                            this.settingSocialMedia = true; this.settingGeneral = false; this.settingDeletePosts = false;
                        }
                    },
                    changeBioHomeaddress: function () {

                        if (this.generalBio.length < 3) {
                            toastr.error("Bio too short!");
                            return;
                        }

                        if (this.generalHomeAddress.length < 3) {
                            toastr.error("Address too short!");
                            return;
                        }

                        var self = this;
                        $.ajax({
                            url: '/brand/r/changedetails?Bio=' + self.generalBio + '&homeAddress=' + self.generalHomeAddress,
                            success: function (answer) {
                                if (answer == 'done') {
                                    toastr.success("Changes saved!");
                                } else {
                                    toastr.error(answer);
                                }
                            }
                        });
                    },
                    changePasswordSaveChanges: function () {
                        this.passwordChangeError = "";
                        this.passwordLoading = true;

                        var oldpass: string = $('#OldPassword').val();
                        var pass: string = $('#NewPassword').val();

                        if (oldpass.length < 3) {
                            this.passwordChangeError = "Incorrect current password";
                            this.passwordLoading = false;
                            return;
                        }

                        if (pass.length < 3) {
                            this.passwordChangeError = "Password too short";
                            this.passwordLoading = false;
                            return;
                        }

                        if ($('#ConfirmNewPassword').val() != $('#NewPassword').val()) {
                            this.passwordChangeError = "Passwords do not match";
                            this.passwordLoading = false;
                            return;
                        }

                        var self = this;
                        $.ajax({
                            url: '/brand/r/ChangePassword?Old=' + oldpass + '&New=' + pass,
                            success: function (answer) {
                                self.passwordLoading = false;
                                if (answer == "done") {
                                    toastr.success('Password changed!', 'Success');
                                } else {
                                    self.passwordChangeError = answer;
                                    return;
                                }
                            }
                        });
                    }
                }
            });

        }

    new Vue({
        el: '#Xapp',
        data: {
            LoginBrandname: '',
            LoginBrandlogo: '',
            LoginBrandNameFound: false,
            eventPost: PostCard,
            PostFound: false
        },
        methods: {
        },
        mounted: function () {
            //Call the resize method
            $(window).resize();
            //Initialize WOW
            new WOW().init();
            //Initialize 

            $.ajax({
                method: 'POST',
                url: "/Brand/r/IsLoggedInBrand",
                success: (answer: string) => {
                    if (answer.indexOf("Error") >= 0) {
                    } else {
                        var brand = JSON.parse(answer);
                        this.LoginBrandname = brand.brand.Name;
                        this.LoginBrandlogo = brand.brand.Logo;
                        this.LoginBrandNameFound = true;
                        this.LogInFailedText = '';
                        this.LogInFailed = false;
                        if (!brand.LoggedIn) {
                            $('#modal-login').modal();
                        }

                        LoggedInBrand = new Brand(brand.brand.ID, brand.brand.Name, brand.brand.Logo);
                        //Initialize tooltips
                        $('[data-toggle="tooltip"]').tooltip();
                        $('[data-toggle="popover"]').popover({
                            html: true,
                            placement: "top",
                            title: this.LoginBrandname,
                            template: `
                            <div class="popover" style="padding-left:20px" role="tooltip">
                               <div class="popover-arrow"></div>
                               <a href="/Brand/` + this.LoginBrandname + `"><h1 class="popover-title text-xs-center"></h1></a>
                               <div class="list-group z-depth-0" style="width:100%">
                                    <a class="list-group-item waves-effect"  href="/Brand/` + this.LoginBrandname + `/edit">
                                          <span class="pull-xs-right">Edit Profile</span>
                                    </a>
                                    <a class="list-group-item waves-effect">
                                          <span class="pull-xs-right">Report Spam</span>
                                    </a>
                                    <a class="list-group-item waves-effect">
                                          <span class="pull-xs-right">Sattle Account</span>
                                    </a>
                                    <a class="list-group-item waves-effect" role="button" onclick="LogOut('` + this.LoginBrandname + `')">
                                         <span class="pull-xs-right">LogOut</span>
                                    </a>
                                </div>
                            </div>
                         `,
                        });
                    }
                }
            });
        }
    });
});

