const mongoose = require('mongoose');

const GrivancesSchema = new mongoose.Schema({
    referenceId:{
        type:String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    subject:{
        type: String,
    },
    description:{
        type: String,
    },
    category:{
        type: String,
    },
    status:{
        type: String,
        default: 'pending'
    },
    img:{
        type: String,
    },
    
    date:{
        type: Date,
        
    },
    comments:{
        type:[
            {
            commentBy:{
                    type:String,
                },
              msg:{
                  type:String
              },
              commentAt:{
                  type:Date,
                  default:Date.now()
              }  
            }
        ]
    },

    isClosed:{
        type:Boolean,
        default:false

    }
    
    
});

module.exports = Grivances = mongoose.model('grivances', GrivancesSchema);
