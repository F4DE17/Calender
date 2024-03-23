
const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzZlixVDExDPkQnZprmtg
EAoIYgRkovaryVmNoWTULObHtsVfngb8eYQAgZQ7vNPUusDJZ6lqZP795lMVgfoG
ex7iXWOWLh6KfM8rU+/GSzcbqiRf/CNcRpQMNSINDeiSDTGHCljmsP3kmKU+L4z5
plocyhWH5dQgch7sNQHtnS7vTydhOblvNCqjXbXlA3voKxOOeEZNyhGQRerP0Hza
UKaoH//5i30xsppI35bWvedRkH93Bd2jXBXHnF1QiGYV/2EP14Z9hehl3fx35A6d
AripeSq8Bx+0uTSY+87jeWxqGI8leHn2BrgGOLmQEqL6unoCpiuUS0nrYY2XDlom
/QIDAQAB`;

const privateKey = `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDNmWLFUMTEM+RC
dmmua2AQCghiBGSi9qvJWY2hZNQs5se2xV+eBvx5hACBlDu809S6wMlnqWpk/v3m
UxWB+gZ7HuJdY5YuHop8zytT78ZLNxuqJF/8I1xGlAw1Ig0N6JINMYcKWOaw/eSY
pT4vjPmmWhzKFYfl1CByHuw1Ae2dLu9PJ2E5uW80KqNdteUDe+grE454Rk3KEZBF
6s/QfNpQpqgf//mLfTGymkjflta951GQf3cF3aNcFcecXVCIZhX/YQ/Xhn2F6GXd
/HfkDp0CuKl5KrwHH7S5NJj7zuN5bGoYjyV4efYGuAY4uZASovq6egKmK5RLSeth
jZcOWib9AgMBAAECggEBALcr9Md+kg+Le82K2dS/bTJc/eL1rwNRaPNWicxEnJP0
d/HqHqoX51ALvrezbRVqVJidsdJdKaEZXPObCgpmyudeOKajVuV36EISALQjZzMT
wd3v0mQ8zLVEqSudTqwZjCWc/obFdaIyUTt93M1YeAMxPXz9ebnVJ6ME0cTYFu51
jOYNffhnHh/od+5VduqqxvNmH7pB+Y69za0AunvaVm8teWbQx3g37xM7wtMhPH59
N0q4HNC79j3j4W4jB7VykpXFmhjzhQPbG1kL+OS6oyCFCXcM2wS18XB4CGnbzYRB
Y66HFK0N+cvI2t9jhFeB5JKaTABTN5TXSy/VRgdl+gECgYEA8rnX16SGsrdm5Tq6
iS2rOPzKgTZ6aIP1H7SX8d1yUkoSkIzpf65FsznAjosw9s3xfRUa3Nr0Y8LIDCe/
wxmESWgdaBmM4eLq/rnv78yIbkTNOe+lyv8kM796E6LJ4hxasQbrG5FZmIlc/3ye
sHRIZEgdG1PgmIEFvLRq+nU1sp0CgYEA2NfExyHhzjjvM8SsuycheV15mbLNi4MT
UXX0QKZcr6eTi753hT3n0prTkCNzFRiEkBEvtck4zfsD5p/3jHLsW1jzk/c6oTLs
Ji4Q6FYnZCF7OEZoyMHln+tS1U/holxa36KPu7xte/H4fKz+kY/XGydJz53HfDO1
dYzzg7EHZ+ECgYADgO8+q59OIRuZH3nl1QTts6hwqQqnS5BUPtUapqmpymvuLjqI
n0leRu0ioZu5VEuyFIXovjhc4Ejm9APumwWv0ZLrF8NS12Ww+5odCgTGIrQbq/vm
rDwnixIGComDfAlLGOB362cxrnnrLi9UOLl6yReyd0l8qhAdIzWQG/UEeQKBgQCh
Ks3gy7gPFJYFPhq8B3uDvwwQRqsrFEMZergODRg6niy14tzmtXpGODkimpaAiXaN
tZhmXqbPwc/GbAML6qbtxhFUWp7DDRwjzH1YkiA49gGlc/+RpzvKPpeUYAjuKgKI
0URPXt9pDhGIaPPUsLpKPktH+pc4Ix6tvhOIP92nQQKBgFANVtExW90X0ntqMQSv
yuE0sMscYZE7ew8AIpl3md0JhEKSdrV31CAD7vqbTZD3hPeg5tzdRFB4giYlr0ku
3xFH2xrHj5ORQS0BuvggCZkdh7KiaxZr3xM5g94Gulaa1ulwINPa9Ef6ebA+/ifr
GmpxnfkHE8bxwei0DVA337jA`;

const { createHash, timingSafeEqual } = require("crypto")

const { generateKeyPairSync, scryptSync, randomBytes } = require("crypto")



class Crypto {
    static publicKey = publicKey;
    static privateKey = privateKey;

    static hash(input) {
        return createHash("sha256").update(input).digest("hex");
    }

    static saltyhash(input, salt) {
        if(!salt) {
            salt = randomBytes(16).toString("hex");
        }

        const hashed = scryptSync(input, salt, 64).toString("hex");

        return `${salt}:${hashed}`;
    }

    static saltyhashMatch(test, password) {
        const [salt, key] = password.split(":");

        const hashedBuffer = scryptSync(test, salt, 64);

        const keyBuffer = Buffer.from(key, 'hex')
        const match = timingSafeEqual(hashedBuffer, keyBuffer)
        console.log(match)
        return match;
    }

    static generateKeyPair() {
        return { privateKey, publicKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        })
    }
}


module.exports = { Crypto }