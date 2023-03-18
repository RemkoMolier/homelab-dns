// Providers:

var REG_NONE = NewRegistrar('none');    // No registrar.
var DNS_INFRA = NewDnsProvider('infra');  // ISC BIND.
var DNS_INFRA_DYNAMIC = NewDnsProvider('infra_dynamic');  // ISC BIND.


D('localhost', REG_NONE,
        DnsProvider(DNS_INFRA),
        DefaultTTL(86400),
        SOA('@', 'localhost.', 'root.localhost.', 10800, 15, 604800, 10800),
        NAMESERVER('localhost.'),
        A('@', '127.0.0.1')
);

D(REV('127.0.0.0/24'), REG_NONE,
        DnsProvider(DNS_INFRA),
        DefaultTTL(86400),
        SOA('@', 'localhost.', 'root.localhost.', 10800, 15, 604800, 10800),
        NAMESERVER('localhost.'),
        PTR('1', 'localhost.')
);



D('home.molier.net!inside', REG_NONE,
        DnsProvider(DNS_INFRA),
        DefaultTTL(86400),
        SOA('@', 'home.molier.net.', 'hostmaster.infra.home.molier.net.', 10800, 15, 604800, 10800),
        NAMESERVER('ns.infra.home.molier.net.'),
        A('router','172.16.0.1'),
        NS('infra','ns.infra.home.molier.net.')
);

D('infra.home.molier.net', REG_NONE,
        DnsProvider(DNS_INFRA),
        DefaultTTL(86400),
        SOA('@', 'infra.home.molier.net.', 'hostmaster.infra.home.molier.net.', 10800, 15, 604800, 10800),
        NAMESERVER('ns.infra.home.molier.net.'),
        NS('dynamic','ns.infra.home.molier.net.'),
        A('@','172.16.0.2'),
        A('ns','172.16.0.2')
);

D('dyamic.infra.home.molier.net', REG_NONE,
        DnsProvider(DNS_INFRA_DYNAMIC),
        DefaultTTL(86400),
        SOA('@', 'infra.home.molier.net.', 'hostmaster.infra.home.molier.net.', 10800, 15, 604800, 10800),
        NAMESERVER('ns.infra.home.molier.net.')
);

D(REV('172.16.0.0/24'), REG_NONE,
        DnsProvider(DNS_INFRA),
        DefaultTTL(86400),
        SOA('@', 'infra.home.molier.net.', 'hostmaster.infra.home.molier.net.', 10800, 15, 604800, 10800),
        NAMESERVER('ns.infra.home.molier.net.'),
        PTR('1','router.home.molier.net.'),
        PTR('2','infra.home.molier.net.')      
);

D(REV('172.16.1.0/24'), REG_NONE,
        DnsProvider(DNS_INFRA_DYNAMIC),
        DefaultTTL(86400),
        SOA('@', 'infra.home.molier.net.', 'hostmaster.infra.home.molier.net.', 10800, 15, 604800, 10800),
        NAMESERVER('ns.infra.home.molier.net.')
);


