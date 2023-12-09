function cmd (a, b)
{
    if (String(a.freq) < String(b.freq)) return -1;
    if (String(a.freq) > String(b.freq)) return 1;
    return 0;
}

function Node(name, freq, code, location, used, parent)
{
    this.name = name;
    this.freq = freq;
    this.code = code;
    this.used = used;
    this.parent = parent;
    this.location = location;
}

function createHaffmanTree(str)
{
    var freq = {};
    for (var i = 0; i < str.length; i++)
    {
        var char = str.charAt(i);
        if (freq[char]) freq[char]++;
        else freq[char] = 1;
    }

    var tree = [];
    for (var char in freq) tree.push(new Node(char, freq[char], "", "", false, null));
    var flag = false;
    while (!flag)
{
    tree.sort(cmd);
    var cnt = 0;
    var i = 0;
    var f = [];
    var n = [];
    var id = [];
    while (cnt != 2)
{
    if (tree[i].used == false)
    {
        tree[i].used = true;
        id[cnt] = i;
        cnt++;
    }
    i++;
}
    tree.push(new Node(tree[id[0]].name + tree[id[1]].name, tree[id[0]].freq + tree[id[1]].freq, "", "", false, null));
    tree[id[0]].parent = tree[tree.length-1].name;
    tree[id[1]].parent = tree[tree.length-1].name;
    tree[id[1]].location = "1";
    tree[id[0]].location = "0";
    var count = 0;
    for (var j = 0; j < tree.length; j++) if (tree[j].used == false) count++;
    if (count == 1) flag = true;
}
    for(var i = 0; i < tree.length; i++)
    {
        if (tree[i].name.length == 1)
        {
            tree[i].code = tree[i].location;
            for(var j = 0; j < tree.length-1; j++)
            {
                if (j == i) continue;
                if (tree[j].name.indexOf(tree[i].name)!=-1) tree[i].code = tree[j].location.concat(tree[i].code);
            }
        }
    }
    return tree;
}

function encode(str, tree)
{
    var encodedStr = "";
    for (var i = 0; i < str.length; i++) for (var j = 0; j < tree.length; j++) if(tree[j].name == str.charAt(i)) encodedStr = encodedStr.concat(tree[j].code);
    return encodedStr;
}

function decode(encodedStr, tree)
{
    var decodedStr = "";
    var code = "";
    var flag = false;
    for (var i = 0; i < encodedStr.length; i++)
    {
        code = code.concat(encodedStr.charAt(i));
        for(var j = 0; j < tree.length && !flag; j++)
        {
            if(tree[j].name.length == 1 && tree[j].code == code)
            {
                flag = true;
                decodedStr = decodedStr.concat(tree[j].name);
            }
        }
    if(flag)
    {
        flag = false;
        code = "";
    }
    }
    return decodedStr;
}

var str = WScript.StdIn.ReadLine();
var tree = createHaffmanTree(str);
var encodedStr = encode(str, tree);
var decodedStr = decode(encodedStr, tree);

WScript.echo("Source string:", str);
WScript.echo("Encoded string:", encodedStr);
WScript.echo("Decoded string:", decodedStr);