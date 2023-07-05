
import React, { useState } from "react";
import {
    SimpleGrid,
    Card,
    Heading,
    CardBody,
    Image,
    Stack,
    Text,
    Divider,
    CardFooter,
    ButtonGroup,
    Button,
    Center
} from "@chakra-ui/react";
import './App.css';
const Web3 = require('web3');

function Content({ SC,TC, currentAddress, isconnect, allItems,setbal }) {
    const [isbCWEcall, setbCWEcall] = useState(0);
    const [isbCWCcall, setbCWCcall] = useState(0);
    //const [allItems, setallItems] = useState([]);
    const web3 = new Web3(window.ethereum);

    function converttoETH(value) {
        return web3.utils.fromWei(value, "ether");
    }

    function showSuccessMessage(text2) {
        alert("SUCCESS", text2);
    }
    function showErrorMessage(text1) {
        alert(text1);
    }

    const getAccountBalance= async()=>{
        if(isconnect && TC !=null){
          let bal = await SC.methods.getUserBalance(currentAddress).call({from:currentAddress});
          let trimbal = web3.utils.fromWei(bal,"ether");
          setbal(trimbal.toString());
        }
        else{
          console.log("NOT connected");
        }
      };


    const buywithETH = async (id, amount) => {
        if (isconnect && !isbCWEcall && SC !=null) {
            try {
                setbCWEcall(1);
                //let tokenTogive = Web3.utils.toWei("1", "ether");

                await SC.methods.bCWETH(id).send({ from: currentAddress, value: amount })
                    .on('receipt', function (receipt) {
                        // transaction confirmed, hide loading UI and update UI to show success message
                        showSuccessMessage(receipt);
                    })
                    .on('error', function (error, receipt) {
                        // transaction rejected, hide loading UI and update UI to show error message
                        showErrorMessage(error.message);
                    });
            }
            catch (error) {
                setbCWEcall(0);
                alert(error);
            }
            await getAccountBalance();
            setbCWEcall(0);
        }
        else {
            if (!isconnect) {
                alert("NO wallet Connected");
            }
            else if (isbCWEcall) {
                alert("Transaction in process");
            }
        }
    };

    const buywithCLT = async (id,amount) => {
        if (isconnect && !isbCWCcall) {
            try {
                setbCWCcall(1);
                await TC.methods.approve('0x383f96CE91Cfb3eBa91a72b0a04fdcE2D58C74FF',amount).send({from:currentAddress})
                    .on('transactionHash',async (hash)=>{
                        await SC.methods.bCWCLT(id).send({ from: currentAddress})
                        .on('receipt',function(receipt){
                            alert("SUCCESS");
                        })
                        .on('error', function (error, receipt) {
                            // transaction rejected, hide loading UI and update UI to show error message
                            alert("FAIL");
                        });
                    })
                    .on('error', function (error, receipt) {
                        // transaction rejected, hide loading UI and update UI to show error message
                        showErrorMessage(error.message);
                    });
            }
            catch (error) {
                setbCWCcall(0);
                alert(error);
            }
            await getAccountBalance();
            setbCWCcall(0);
        }
        else {
            if (!isconnect) {
                alert("NO wallet Connected");
            }
            else if (isbCWCcall) {
                alert("Transaction in process");
            }
        }
    };

    const txnanimation = ()=>{
        if(!isbCWCcall || !isbCWEcall){
            return(<div id="txn-wait">Wait...</div>);
        }
    };

    return (
        <div id="menu" >
            {(isbCWCcall||isbCWEcall)?<div id="txnwait">Wait. . .</div>:<div></div> }
            <SimpleGrid
                spacing={14}
                templateColumns="repeat(auto-fill, minmax(300px, 10fr))"
            >
                {allItems.map((item) => (
                    <React.Fragment key={item.id}>
                        <Card maxW="sm" align='center'>
                            <CardBody>
                                <Image
                                    src={item['src']}
                                    boxSize='200px'
                                    alt="Coffee Image"
                                    borderRadius="lg"
                                />
                                <Stack mt="4" spacing="2">
                                    <Heading size="md">{item['Name']}</Heading>
                                    
                                    <Text color="blue.600" fontSize="2xl">
                                        {converttoETH(item['ETHPrice'])} ETH
                                    </Text>
                                    <Text color="blue.600" fontSize="2xl">
                                        {converttoETH(item['CLTPrice'])} CLT
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <ButtonGroup gap='2' flexDirection={"column"}>
                                    <Button variant="solid" colorScheme="blue" onClick={async () => buywithETH(item.id, item['ETHPrice'])}>
                                        Buy now with ETH
                                    </Button>

                                    <Button variant="solid" colorScheme="blue" onClick={async () => buywithCLT(item.id,item['CLTPrice'])}>
                                        Buy now with CLT
                                    </Button>

                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    </React.Fragment>
                ))}
            </SimpleGrid>
        </div>

    );
}

export default Content;

//100 Americano 5*10**16 10*10**18 "https://e7.pngegg.com/pngimages/890/365/png-clipart-coffee-cafe-au-lait-caffe-americano-choice-wat-santikham-coffee-tea-coffee-thumbnail.png"
//101 Latte 6*10**16 12*10**18 "https://w7.pngwing.com/pngs/707/144/png-transparent-latte-real-coffee-coffee-art.png"
//102 Cappuccino 6*10**16 12*10**18 "https://ipfs.io/ipfs/QmWM7yJvHWjNLbrwZXFXNw1bB5stGbdcvh2tTs1EMWLi5H?filename=Cappuccino.png"

