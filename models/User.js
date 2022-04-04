//create a user mngoose schema
const mongoose = require('mongoose');

    
const UserSchema = new mongoose.Schema({
    username:{
        type:String,

    },
    profileImg:{
        type:String,
    },
    name:{
        type: String,
        
    },
    mobile:{
        type: String,
         },
    email:{
        type: String,
    },
    password:{
        type: String,
        
    },
    address1:{

    },
    address2:{
        type: String,
    },
    dob:{
        type: String,
    },
    
    aadhar:{
        type: String,
        
    },
    pan:{
        type: String,
    },
    aadharBackImg:{
        type: String,
    },
    aadharFrontImg:{
        type: String,
    },
    panImg:{
        type: String,
    },
    passbookImg:{
        type: String,
    },
    isKYCApproved:{
        
        type: Boolean,
        default: false
    
    },
    isKYCDeclined:{
        type: Boolean,
        default: false
    },
    KYCDeclineReason:{
        type: String,
    },
    isKYCSubmitted:{
        type:Boolean,
        default:false
    },
    package:{
        type: String,
    },
    isWalletPaid:{
        type: Boolean,
        default: false
    },
    isWalletApproved:{
        type: Boolean,
        default: false
    },
    isWalletDeclined:{
        type: Boolean,
        default: false
    },
    isActive:{
        type: Boolean,
    },
    isEnrolled:{
        type: Boolean,
        default: false
    },
    isAdminBlocked:{
        type:Boolean,
        default:false
    },
    enrolledDate:{
        type: Date,

    },


    wallet:{
        type:{
            paymentId:{
                type:String
            },
            datePaid:{
                type:Date,
                default:Date.now
            },
            paySlip:{
                type:String
            },
            amount:{
                type:String
            },
            upiId:{
                type:String
            },
            upi:{
                type:String
            },
            remarks:{
                type:String
            },
            country:{
                type:String
            },
            state:{
                type:String
            },
            city:{
                type:String
            }
        }
    },

    referId:{
        type:String,
    },
    uplinkReferId:{
        type:String,
    },
    uplinkId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    firstGen:
        [{
            
                
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User',
                
            
        }]
    ,
    totalFirstGenEarning:{
        type:Number,
        default:0
    },
    totalSecondGenEarning:{
        type:Number,
        default:0
    },
    totalThirdGenEarning:{
        type:Number,
        default:0
    },
    
    firstGenCount:{
        type:Number,
        default:0
    },
    secondGenCount:{
        type:Number,
        default:0
    },
    thirdGenCount:{
        type: Number,
        default:0
    },
    dayEarning:{
        type:[
            {
            firstGenDayEarning:{
                type:Number,
                default:0
            },
            secondGenDayEarning:{
                type:Number,
                default:0
            },
            thirdGenDayEarning:{
                type:Number,
                default:0
            },
            earningDate:{
                type:String
            },
            isApproved:{
                type:Boolean,
                default:false
            },
            isDeclined:{
                type:Boolean,
                
            }
        }
        ]
    },

    bankDetails:{
        type:{
            bankName:{
                type:String
            },
            accountNo:{
                type:String
            },
            ifsc:{
                type:String
            },
            upiId:{
                type:String
            },
            branchName:{
                type:String
            },
            branchCity:{
                type:String
            },
            branchState:{
                type:String
            },
            
        },
        
    },

    grivances:
     {
         type:[
        {
            grivanceId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Grivances',
            }
            
        }
    
        ]
    }
            

    
})

module.exports = User = mongoose.model('User', UserSchema)
